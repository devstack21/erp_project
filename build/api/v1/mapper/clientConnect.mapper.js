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
const clientConnect_dto_1 = require("../dto/clientConnect.dto");
const store_mapper_1 = __importDefault(require("./store.mapper"));
class ClientConnectMapper {
    toDto(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientConnectDto = new clientConnect_dto_1.ClientConnectDto();
            clientConnectDto.id = client.id;
            clientConnectDto.username = client.username;
            clientConnectDto.email = client.email;
            clientConnectDto.phone = client.phone;
            clientConnectDto.stores = yield this.getStoresClient(client);
            return clientConnectDto;
        });
    }
    toDtoArray(clients) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(clients.map(client => this.toDto(client)));
        });
    }
    getStoresClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            return store_mapper_1.default.toDtoArray(client.stores);
        });
    }
}
exports.default = new ClientConnectMapper();
