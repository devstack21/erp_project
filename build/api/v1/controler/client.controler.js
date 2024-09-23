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
const clientService_1 = __importDefault(require("../service/clientService"));
const jwtService_1 = __importDefault(require("../service/jwtService"));
class ClientControler {
    constructor(clientService) {
        this.getClientConnected = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const token = request.headers['authorization'] && request.headers['authorization'].split(' ')[1];
            this.clientService.getClientIsConnected(token)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        });
        this.clientService = clientService;
    }
}
exports.default = new ClientControler(new clientService_1.default(new jwtService_1.default()));
