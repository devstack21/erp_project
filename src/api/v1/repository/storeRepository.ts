import { Client } from '../db/models/client.models';
import { Store } from '../db/models/store.models'; 
import dbInstance from '../db/ormconfig';
import { StoreDto } from '../dto/store.dto';
import { Auth401Exception } from '../exception/auth401Exception';
import { DomainError } from '../exception/domainException';
import { DistrictRepository } from './districtRepository';
import { TypeStoreRepository } from './typeStoreRepository';
import { ClientRepository } from './clientRepository';
import { AppException } from '../exception/AppException';
import storeMapper from '../mapper/store.mapper';
import { Article } from '../db/models/article.models';
import { EntityManager } from 'typeorm';
import { AlertConfig } from '../enum/enum.cte';
import OutStockCronManager from '../../cron/outStockCron';
import { Alert } from '../db/models/alert.models';
import { filteredFieldStore } from '../domain/type.domain.filtered';
export const StoreRepository = dbInstance.getRepository(Store).extend({
    async findByName(name: string): Promise<Store | undefined> {
        const store = await this.findOne({ where: { name },
            relations: ['owner', 'typeStore', 'district'] });
        return store ? store : undefined;
    },
    async findByClientId(clientId: number): Promise<Store[]> {
        return this.find({ where: { owner: { id: clientId } } ,
            relations: ['owner', 'typeStore', 'district']
        });
    },
    async findByTypeStoreId(typeStoreId: number): Promise<Store[]> {
        return this.find({ where: { typeStore: { id: typeStoreId } } ,
            relations: ['owner', 'typeStore', 'district']
        
        });
    },
    async addStore (transactionalEntity : EntityManager , data : StoreDto, client : Client | null){
        try {
            let storeExist = await transactionalEntity.withRepository(this).findByName(data.name)
            if(storeExist) throw new DomainError('Le nom associé a cette boutique existe déja', 400,'Store', 'name store exist already')
            
            const newStore = new Store()

            newStore.name = data.name
    
            if(!client) throw new Auth401Exception("Le client n'existe pas ", 'User not found')
            newStore.owner =  client
            
            const district = await transactionalEntity.withRepository(DistrictRepository).findByName(data.districtName)
            if(!district) throw new DomainError("Le quartier associé a cette boutique n'existe pas", 400,'District', 'district not define')
            newStore.district = district
            
            const typeStore = await transactionalEntity.withRepository(TypeStoreRepository).findByLibelle(data.typeStore)
            if(!typeStore) throw new DomainError("Le type de boutique associé n'existe pas", 400,'TypeStore', 'type store not define')
            newStore.typeStore = typeStore

            const storeSaved = await transactionalEntity.withRepository(this).save(newStore)
            .catch((error)=>{
                console.error(error)
                throw new AppException("Echec de création de la boutique" ,400,"APP_ERR_00",error.reason)
            })
            // push store user
            transactionalEntity.withRepository(ClientRepository).addOwnerStore(client , storeSaved)
            transactionalEntity.withRepository(TypeStoreRepository).registerStore(typeStore , storeSaved)
            //push district 
            return storeSaved

        } catch (error) {
            throw error
        }
    },
    async updateStore(transactionalEntity : EntityManager, storeId : number , fieldUpdated : filteredFieldStore ){
        try {
            const store = await transactionalEntity.withRepository(this).findOne({ where: { id: storeId } });
            if (!store) throw new DomainError("Le store n'existe pas", 400, 'Store', 'store not found');

            // alert config 
            if(fieldUpdated.configAlert){
                //update config alert config
                store.alertConfig = fieldUpdated.configAlert
                //start cron
                const cronManager = OutStockCronManager.getInstance();
                if (fieldUpdated.configAlert === AlertConfig.ACTIVED ) {
                    cronManager.startCronJob(store);
                } else if (fieldUpdated.configAlert === AlertConfig.DESACTIVED ) {
                    cronManager.stopCronJob(storeId);
                }
            }
            
            if (fieldUpdated.name) store.name = fieldUpdated.name;
            
            if (fieldUpdated.districtName) {
                const district = await transactionalEntity.withRepository(DistrictRepository).findByName(fieldUpdated.districtName);
                if (!district) throw new DomainError("Le quartier associé n'existe pas", 400, 'Store', 'district not found');
                store.district = district;
            }
            if (fieldUpdated.typeStore) {
                const typeStore = await transactionalEntity.withRepository(TypeStoreRepository).findByLibelle(fieldUpdated.typeStore);
                if (!typeStore) throw new DomainError("Le type de boutique associé n'existe pas", 400, 'Store', 'type store not found');
                store.typeStore = typeStore;
            }
            // updated store
            const updatedStore = await transactionalEntity.withRepository(this).save(store).catch((error) => {
                throw new AppException("Échec de mise à jour de la boutique", 400, "APP_ERR_01", error.reason);
            });
            return updatedStore;
        } catch (error) {
            throw error;
        }
    },
    async deleteStore(storeId : number){
        try {
            const store = await StoreRepository.findOne({where : {id : storeId}});
            if (!store) throw new DomainError("Le store n'existe pas", 404, 'Store', 'store not found');
            await this.remove(store).catch((error) => {
                console.error(error);
                throw new AppException("Échec de suppression de la boutique", 400, "APP_ERR_01", error.reason);
            });
            return true 
        } catch (error) {
            throw error;
        }    
    },
    async getStore(client : Client | null){
        try {
            if(!client) throw new Auth401Exception("Le client n'existe pas ", 'User not found')
            const stores = await this.findByClientId(client.id);
            if (!stores.length) {
                throw new DomainError('Aucun magasin trouvé pour cet utilisateur', 404, 'Store', 'no user stores found');
            }
            return storeMapper.toDtoArray(stores)
        } catch (error) {

            throw error
        }
    } ,
    addArticleStore(article : Article , store : Store){
        if (store.articles) {
            store.articles.push(article);
        } else {
            store.articles = [article];
        }
    },
    addAlertStore(alert : Alert , store : Store){
        if (store.alertes) {
            store.alertes.push(alert);
        } else {
            store.alertes = [alert];
        }
    }
});
