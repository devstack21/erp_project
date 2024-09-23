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
const handlerException_1 = __importDefault(require("../handlerException/handlerException"));
const clientRepository_1 = require("../repository/clientRepository");
class ClientService {
    constructor(jwtService) {
        this.clientRepository = clientRepository_1.ClientRepository;
        this.jwtService = jwtService;
    }
    getClientIsConnected(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userTokenConnected = yield this.jwtService.getUserJwtTokenDecrypt(token);
                const clientConnected = yield this.clientRepository.getClientConnected(userTokenConnected);
                return {
                    status: 200,
                    response_data: clientConnected
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
}
exports.default = ClientService;
