import { Store } from '../db/models/store.models';
import { TypeStore } from '../db/models/type.store.models';
import dbInstance from '../db/ormconfig';
import { DomainError } from '../exception/domainException';
import typeStoreMapper from '../mapper/typeStore.mapper';
export const TypeStoreRepository = dbInstance.getRepository(TypeStore).extend({
    async findByLibelle(libelle: string): Promise<TypeStore | undefined> {
        const typeStore = await this.findOne({ where: { libelle } });
        return typeStore ? typeStore : undefined;
    },
    async findById(id: number): Promise<TypeStore | undefined> {
        const typeStore = await this.findOne({ where: { id } });
        return typeStore ? typeStore : undefined;
    },
    registerStore(typeStore : TypeStore , store : Store ){
        if (typeStore.stores) {
            typeStore.stores.push(store);
        } else {
            typeStore.stores = [store];
        }
    },
    async getListTypeStore(typeStoreId : number){
        try {
            let query = this.createQueryBuilder('typeStore') 
            if(typeStoreId){
                const typeStore = await this.findOne({where : {id : typeStoreId}})
                if(!typeStore) throw new DomainError("Le type de magasin spécifié n'existe pas", 400, 'Type Store', 'ID TypeStore not found');
                query = query.andWhere('typeStore.id = :typeStoreId', {typeStoreId})
            }  
            const typeStores = await query.getMany()
            return typeStoreMapper.toDtoArray(typeStores)     
        } catch (error) {
            throw error
        }
    }
});
