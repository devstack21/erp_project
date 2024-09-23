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
const jwtService_1 = __importDefault(require("../service/jwtService"));
const auth401Exception_1 = require("../exception/auth401Exception");
const handlerException_1 = __importDefault(require("../handlerException/handlerException"));
class AuthJwtMiddleware {
    constructor(jwtService) {
        this.authorizeRequest = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authToken = request.headers['authorization'];
                const token = authToken && authToken.split(' ')[1];
                const client = yield this.jwtService.getUserJwtTokenDecrypt(token);
                if (!client)
                    throw new auth401Exception_1.Auth401Exception("Accès refusé", "Access denied");
                next();
            }
            catch (error) {
                console.error(error);
                return response.json(handlerException_1.default.handleError(error));
            }
        });
        this.jwtService = jwtService;
    }
}
exports.default = new AuthJwtMiddleware(new jwtService_1.default());
