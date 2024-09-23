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
exports.SupplierRepository = void 0;
const supplier_models_1 = require("../db/models/supplier.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const AppException_1 = require("../exception/AppException");
const storeRepository_1 = require("./storeRepository");
const supplier_mapper_1 = __importDefault(require("../mapper/supplier.mapper"));
exports.SupplierRepository = ormconfig_1.default.getRepository(supplier_models_1.Supplier).extend({
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield this.findOne({ where: { name: name } });
            return supplier ? supplier : undefined;
        });
    },
    findByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield this.findOne({ where: { phone: phone } });
            return supplier ? supplier : undefined;
        });
    },
    findOneByArticleIdStore(supplierId, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield this.findOne({ where: { id: supplierId, store: { id: storeId } },
                relations: ['store']
            });
            return supplier ? supplier : undefined;
        });
    },
    createSupplierStore(transactionalEntity, storeId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield transactionalEntity.withRepository(storeRepository_1.StoreRepository).findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("Le store associé n'existe pas", 400, 'Store', 'store not found');
                // new supplier
                const newSupplier = new supplier_models_1.Supplier();
                newSupplier.name = data.name;
                newSupplier.phone = data.phone;
                newSupplier.store = store;
                // Save supplier in bd
                return yield transactionalEntity.withRepository(this).save(newSupplier).catch((error) => {
                    console.error(error);
                    throw new AppException_1.AppException("Échec de création du fournisseur", 400, "APP_ERR_00", error.reason);
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    },
    updateSupplierStore(transactionalEntity, storeId, supplierId, fieldUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield transactionalEntity.withRepository(storeRepository_1.StoreRepository).findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("La boutique associée n'existe pas", 400, 'Store', 'store not found');
                const supplier = yield transactionalEntity.withRepository(this).findOneByArticleIdStore(supplierId, storeId);
                if (!supplier)
                    throw new domainException_1.DomainError("Le fournisseur n'est pas associé à cette boutique", 400, 'Supplier', 'supplier not associated with this store');
                // Update fields if provided
                if (fieldUpdated.name) {
                    supplier.name = fieldUpdated.name;
                }
                if (fieldUpdated.phone) {
                    supplier.phone = fieldUpdated.phone;
                }
                // Save the updated supplier
                return yield transactionalEntity.withRepository(this).save(supplier).catch((error) => {
                    throw new AppException_1.AppException("Échec de mise à jour du fournisseur", 400, "APP_ERR_02", error.message);
                });
            }
            catch (error) {
                throw error;
            }
        });
    },
    getSupplierStore(storeId, supplierId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("Le store n'existe pas", 404, 'Store', 'store not found');
                let query = this.createQueryBuilder('supplier')
                    .where('supplier.storeId = :storeId', { storeId });
                if (supplierId) {
                    query = query.andWhere('supplier.id = :supplierId', { supplierId });
                }
                const suppliers = yield query.getMany();
                return supplier_mapper_1.default.toDtoArray(suppliers);
            }
            catch (error) {
                throw error;
            }
        });
    },
    deleteSupplierStore(storeId, supplierId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("Le store n'existe pas", 404, 'Store', 'store not found');
                const supplier = yield this.findOneByArticleIdStore(supplierId, storeId);
                if (!supplier)
                    throw new domainException_1.DomainError("Le fournisseur n'est pas associé à cette boutique", 400, 'Supplier', 'supplier not associated with this store');
                yield this.remove(supplier).catch((error) => {
                    throw new AppException_1.AppException("Échec de suppression du fournisseur", 400, "APP_ERR_01", error.reason);
                });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
});
