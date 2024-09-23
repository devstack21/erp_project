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
exports.StoreRepository = void 0;
const store_models_1 = require("../db/models/store.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const auth401Exception_1 = require("../exception/auth401Exception");
const domainException_1 = require("../exception/domainException");
const districtRepository_1 = require("./districtRepository");
const typeStoreRepository_1 = require("./typeStoreRepository");
const clientRepository_1 = require("./clientRepository");
const AppException_1 = require("../exception/AppException");
const store_mapper_1 = __importDefault(require("../mapper/store.mapper"));
const enum_cte_1 = require("../enum/enum.cte");
const outStockCron_1 = __importDefault(require("../../cron/outStockCron"));
exports.StoreRepository = ormconfig_1.default.getRepository(store_models_1.Store).extend({
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield this.findOne({ where: { name },
                relations: ['owner', 'typeStore', 'district'] });
            return store ? store : undefined;
        });
    },
    findByClientId(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ where: { owner: { id: clientId } },
                relations: ['owner', 'typeStore', 'district']
            });
        });
    },
    findByTypeStoreId(typeStoreId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ where: { typeStore: { id: typeStoreId } },
                relations: ['owner', 'typeStore', 'district']
            });
        });
    },
    addStore(transactionalEntity, data, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let storeExist = yield transactionalEntity.withRepository(this).findByName(data.name);
                if (storeExist)
                    throw new domainException_1.DomainError('Le nom associé a cette boutique existe déja', 400, 'Store', 'name store exist already');
                const newStore = new store_models_1.Store();
                newStore.name = data.name;
                if (!client)
                    throw new auth401Exception_1.Auth401Exception("Le client n'existe pas ", 'User not found');
                newStore.owner = client;
                const district = yield transactionalEntity.withRepository(districtRepository_1.DistrictRepository).findByName(data.districtName);
                if (!district)
                    throw new domainException_1.DomainError("Le quartier associé a cette boutique n'existe pas", 400, 'District', 'district not define');
                newStore.district = district;
                const typeStore = yield transactionalEntity.withRepository(typeStoreRepository_1.TypeStoreRepository).findByLibelle(data.typeStore);
                if (!typeStore)
                    throw new domainException_1.DomainError("Le type de boutique associé n'existe pas", 400, 'TypeStore', 'type store not define');
                newStore.typeStore = typeStore;
                const storeSaved = yield transactionalEntity.withRepository(this).save(newStore)
                    .catch((error) => {
                    console.error(error);
                    throw new AppException_1.AppException("Echec de création de la boutique", 400, "APP_ERR_00", error.reason);
                });
                // push store user
                transactionalEntity.withRepository(clientRepository_1.ClientRepository).addOwnerStore(client, storeSaved);
                transactionalEntity.withRepository(typeStoreRepository_1.TypeStoreRepository).registerStore(typeStore, storeSaved);
                //push district 
                return storeSaved;
            }
            catch (error) {
                throw error;
            }
        });
    },
    updateStore(transactionalEntity, storeId, fieldUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield transactionalEntity.withRepository(this).findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("Le store n'existe pas", 400, 'Store', 'store not found');
                // alert config 
                if (fieldUpdated.configAlert) {
                    //update config alert config
                    store.alertConfig = fieldUpdated.configAlert;
                    //start cron
                    const cronManager = outStockCron_1.default.getInstance();
                    if (fieldUpdated.configAlert === enum_cte_1.AlertConfig.ACTIVED) {
                        cronManager.startCronJob(store);
                    }
                    else if (fieldUpdated.configAlert === enum_cte_1.AlertConfig.DESACTIVED) {
                        cronManager.stopCronJob(storeId);
                    }
                }
                if (fieldUpdated.name)
                    store.name = fieldUpdated.name;
                if (fieldUpdated.districtName) {
                    const district = yield transactionalEntity.withRepository(districtRepository_1.DistrictRepository).findByName(fieldUpdated.districtName);
                    if (!district)
                        throw new domainException_1.DomainError("Le quartier associé n'existe pas", 400, 'Store', 'district not found');
                    store.district = district;
                }
                if (fieldUpdated.typeStore) {
                    const typeStore = yield transactionalEntity.withRepository(typeStoreRepository_1.TypeStoreRepository).findByLibelle(fieldUpdated.typeStore);
                    if (!typeStore)
                        throw new domainException_1.DomainError("Le type de boutique associé n'existe pas", 400, 'Store', 'type store not found');
                    store.typeStore = typeStore;
                }
                // updated store
                const updatedStore = yield transactionalEntity.withRepository(this).save(store).catch((error) => {
                    throw new AppException_1.AppException("Échec de mise à jour de la boutique", 400, "APP_ERR_01", error.reason);
                });
                return updatedStore;
            }
            catch (error) {
                throw error;
            }
        });
    },
    deleteStore(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield exports.StoreRepository.findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("Le store n'existe pas", 404, 'Store', 'store not found');
                yield this.remove(store).catch((error) => {
                    console.error(error);
                    throw new AppException_1.AppException("Échec de suppression de la boutique", 400, "APP_ERR_01", error.reason);
                });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    },
    getStore(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!client)
                    throw new auth401Exception_1.Auth401Exception("Le client n'existe pas ", 'User not found');
                const stores = yield this.findByClientId(client.id);
                if (!stores.length) {
                    throw new domainException_1.DomainError('Aucun magasin trouvé pour cet utilisateur', 404, 'Store', 'no user stores found');
                }
                return store_mapper_1.default.toDtoArray(stores);
            }
            catch (error) {
                throw error;
            }
        });
    },
    addArticleStore(article, store) {
        if (store.articles) {
            store.articles.push(article);
        }
        else {
            store.articles = [article];
        }
    },
    addAlertStore(alert, store) {
        if (store.alertes) {
            store.alertes.push(alert);
        }
        else {
            store.alertes = [alert];
        }
    }
});
