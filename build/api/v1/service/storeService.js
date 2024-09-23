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
const store_dto_1 = require("../dto/store.dto");
const storeRepository_1 = require("../repository/storeRepository");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validationStoreException_1 = require("../exception/validationStoreException");
const handlerException_1 = __importDefault(require("../handlerException/handlerException"));
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
class StoreService {
    constructor(validationErrorStore, jwtService) {
        this.storeRepository = storeRepository_1.StoreRepository;
        this.validationErrorStore = validationErrorStore;
        this.jwtService = jwtService;
    }
    addStore(data, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createStoreDto = (0, class_transformer_1.plainToClass)(store_dto_1.StoreDto, data);
                const errors = yield (0, class_validator_1.validate)(createStoreDto);
                if (errors.length > 0) {
                    const errorsValidation = this.validationErrorStore.responseValidateError(errors);
                    throw new validationStoreException_1.ValidationStoreException(errorsValidation, "Erreur de validation lors de l'ajout d'une boutique", 'Validation add store error');
                }
                const store = yield ormconfig_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                    const transactionalStoreRepository = manager.withRepository(storeRepository_1.StoreRepository);
                    const userCurrent = yield this.jwtService.getUserJwtTokenDecrypt(token);
                    return yield transactionalStoreRepository.addStore(manager, data, userCurrent);
                }));
                return {
                    status: 201,
                    message: 'La boutique a été créee avec succès',
                    id: store.id
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getStore(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = yield this.jwtService.getUserJwtTokenDecrypt(token);
                const stores = yield this.storeRepository.getStore(owner);
                return {
                    status: 200,
                    response_data: stores
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    updateStore(storeId, fieldUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeUpdated = yield ormconfig_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                    const transactionStoreRepository = manager.withRepository(storeRepository_1.StoreRepository);
                    return yield transactionStoreRepository.updateStore(manager, storeId, fieldUpdated);
                }));
                return {
                    status: 200,
                    message: "La boutique a été mise à jour avec succès",
                    id: storeUpdated.id
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    deleteStore(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.storeRepository.deleteStore(storeId);
                return {
                    status: 204,
                    message: "Suppression de la boutique réussie avec succès"
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
}
exports.default = StoreService;
