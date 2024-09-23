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
const storeService_1 = __importDefault(require("../service/storeService"));
const jwtService_1 = __importDefault(require("../service/jwtService"));
const validationError_store_1 = __importDefault(require("../utils/validationError.store"));
const store_dto_1 = require("../dto/store.dto");
const class_transformer_1 = require("class-transformer");
const enum_cte_1 = require("../enum/enum.cte");
class StoreControler {
    constructor(storeService) {
        this.addStore = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const token = request.headers['authorization'] && request.headers['authorization'].split(' ')[1];
            const storeDto = (0, class_transformer_1.plainToClass)(store_dto_1.StoreDto, request.body);
            this.storeService.addStore(storeDto, token)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        });
        this.getStore = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const token = request.headers['authorization'] && request.headers['authorization'].split(' ')[1];
            this.storeService.getStore(token)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        });
        this.updateStore = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                response.json({ status: 400, message: "l'identifiant de la boutique n'est pas défini" });
            const name = request.query.name;
            const districtName = request.query.districtName;
            const typeStore = request.query.typeStore;
            const configAlert = request.query.configAlert;
            if (configAlert) {
                const alertConfigEnum = Object.values(enum_cte_1.AlertConfig).includes(configAlert);
                if (!alertConfigEnum)
                    response.json({ status: 400, message: "Cette configuration de cette alerte n'existe pas" });
            }
            const fieldUpdated = {
                name: name,
                districtName: districtName,
                typeStore: typeStore,
                configAlert: configAlert
            };
            this.storeService.updateStore(storeId, fieldUpdated)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        });
        this.deleteStore = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                response.json({ status: 400, message: "l'identifiant de la boutique n'est pas défini" });
            this.storeService.deleteStore(storeId)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        });
        this.storeService = storeService;
    }
}
exports.default = new StoreControler(new storeService_1.default(new validationError_store_1.default(), new jwtService_1.default()));
