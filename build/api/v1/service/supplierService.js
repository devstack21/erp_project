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
const class_transformer_1 = require("class-transformer");
const supplier_dto_1 = require("../dto/supplier.dto");
const handlerException_1 = __importDefault(require("../handlerException/handlerException"));
const supplierRepository_1 = require("../repository/supplierRepository");
const class_validator_1 = require("class-validator");
const validationSupplierException_1 = require("../exception/validationSupplierException");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
class SupplierService {
    constructor(validationErrorSupplier) {
        this.supplierRepository = supplierRepository_1.SupplierRepository;
        this.validationErrorSupplier = validationErrorSupplier;
    }
    createSupplierStore(storeId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createSupplierDto = (0, class_transformer_1.plainToClass)(supplier_dto_1.SupplierDto, data);
                const errors = yield (0, class_validator_1.validate)(createSupplierDto);
                if (errors.length > 0) {
                    const errorsValidation = this.validationErrorSupplier.responseValidateError(errors);
                    throw new validationSupplierException_1.ValidationSupplierException(errorsValidation, "Erreur de validation lors de l'ajout d'un fournisseur", "Validation add supplier error");
                }
                const supplier = yield ormconfig_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                    const transactionSupplierRepository = manager.withRepository(this.supplierRepository);
                    return yield transactionSupplierRepository.createSupplierStore(manager, storeId, data);
                }));
                return {
                    status: 201,
                    message: 'Le fournisseur a été crée avec succès',
                    id: supplier.id
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    updateSupplierStore(storeId, supplierId, fieldUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const supplierUpdated = yield ormconfig_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                    const transationRepository = manager.withRepository(supplierRepository_1.SupplierRepository);
                    return yield transationRepository.updateSupplierStore(manager, storeId, supplierId, fieldUpdated);
                }));
                return {
                    status: 201,
                    message: 'Le fournisseur a été mit à jour avec succès',
                    id: supplierUpdated.id
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getSupplierStore(storeId, supplierId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const suppliers = yield this.supplierRepository.getSupplierStore(storeId, supplierId);
                return {
                    status: 200,
                    response_data: suppliers
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    deleteSupplierStore(storeId, supplierId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.supplierRepository.deleteSupplierStore(storeId, supplierId);
                return {
                    status: 204,
                    message: "Suppression du fournisseur réussie avec succès"
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
}
exports.default = SupplierService;
