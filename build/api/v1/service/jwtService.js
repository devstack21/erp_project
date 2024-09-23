"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtException_1 = require("../exception/jwtException");
const clientRepository_1 = require("../repository/clientRepository");
const auth401Exception_1 = require("../exception/auth401Exception");
class JwtService {
    constructor() {
        this.clientRepository = clientRepository_1.ClientRepository;
        this.generateJwtToken = (client) => {
            return jsonwebtoken_1.default.sign({ id: client.id }, process.env.KEY_TOKEN_DECRYPT, { expiresIn: JwtService.TIME_MAX_TOKEN_IS_ACTIVE });
        };
        this.generateJwtTokenExpire = (userId) => {
            return jsonwebtoken_1.default.sign({ id: userId }, process.env.KEY_TOKEN_DECRYPT, { expiresIn: '1s' });
        };
        this.getUserJwtTokenDecrypt = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token)
                    throw new jwtException_1.JwtErrorException("Token non valide", 'Token not valid');
                const decryptedToken = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN_DECRYPT);
                const userId = decryptedToken.id;
                const client = yield this.clientRepository.findOne({ where: { id: userId } });
                if (!client)
                    throw new auth401Exception_1.Auth401Exception("Cet utilisateur n'existe pas", "User token not found");
                return client;
            }
            catch (err) {
                if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    throw new jwtException_1.JwtErrorException("Le token a expiré ou est invalide", 'Token expired or invalid');
                }
                throw err;
            }
        });
    }
}
JwtService.TIME_MAX_TOKEN_IS_ACTIVE = 60 * 60 * 24 * 15;
exports.default = JwtService;
