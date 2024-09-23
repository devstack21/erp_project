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
exports.TypeStoreRepository = void 0;
const type_store_models_1 = require("../db/models/type.store.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const typeStore_mapper_1 = __importDefault(require("../mapper/typeStore.mapper"));
exports.TypeStoreRepository = ormconfig_1.default.getRepository(type_store_models_1.TypeStore).extend({
    findByLibelle(libelle) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeStore = yield this.findOne({ where: { libelle } });
            return typeStore ? typeStore : undefined;
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeStore = yield this.findOne({ where: { id } });
            return typeStore ? typeStore : undefined;
        });
    },
    registerStore(typeStore, store) {
        if (typeStore.stores) {
            typeStore.stores.push(store);
        }
        else {
            typeStore.stores = [store];
        }
    },
    getListTypeStore(typeStoreId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = this.createQueryBuilder('typeStore');
                if (typeStoreId) {
                    const typeStore = yield this.findOne({ where: { id: typeStoreId } });
                    if (!typeStore)
                        throw new domainException_1.DomainError("Le type de magasin spécifié n'existe pas", 400, 'Type Store', 'ID TypeStore not found');
                    query = query.andWhere('typeStore.id = :typeStoreId', { typeStoreId });
                }
                const typeStores = yield query.getMany();
                return typeStore_mapper_1.default.toDtoArray(typeStores);
            }
            catch (error) {
                throw error;
            }
        });
    }
});
