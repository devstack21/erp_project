import { Supplier } from '../db/models/supplier.models';
import dbInstance from '../db/ormconfig';
import { SupplierDto } from '../dto/supplier.dto';
import { DomainError } from '../exception/domainException';
import { EntityManager } from 'typeorm';
import { AppException } from '../exception/AppException';
import { StoreRepository } from './storeRepository';
import supplierMapper from '../mapper/supplier.mapper';
import { filteredFieldSupplier } from '../domain/type.domain.filtered';
export const SupplierRepository = dbInstance.getRepository(Supplier).extend({
    async findByName(name: string): Promise<Supplier | undefined> {
        const supplier = await this.findOne({ where: { name : name } });
        return supplier ? supplier : undefined
    },
    async findByPhone(phone: string): Promise<Supplier | undefined> {
        const supplier = await this.findOne({ where: { phone : phone } });
        return supplier ? supplier : undefined
    },
    async findOneByArticleIdStore(supplierId : number , storeId : number){
        const supplier = await this.findOne({where : {id : supplierId, store : {id : storeId}},
            relations : ['store']
        })
        return supplier ? supplier : undefined
    },
    async createSupplierStore(transactionalEntity: EntityManager, storeId: number, data: SupplierDto) {
        try {
            const store = await transactionalEntity.withRepository(StoreRepository).findOne({ where: { id: storeId } });
            if (!store) throw new DomainError("Le store associé n'existe pas", 400, 'Store', 'store not found');
    
            // new supplier
            const newSupplier = new Supplier();
            newSupplier.name = data.name;
            newSupplier.phone = data.phone;
            newSupplier.store = store;
    
            // Save supplier in bd
            return await transactionalEntity.withRepository(this).save(newSupplier).catch((error) => {
                console.error(error);
                throw new AppException("Échec de création du fournisseur", 400, "APP_ERR_00", error.reason);
            });
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async updateSupplierStore(transactionalEntity : EntityManager , storeId : number , supplierId : number , fieldUpdated : filteredFieldSupplier){
        try {
            const store = await transactionalEntity.withRepository(StoreRepository).findOne({ where: { id: storeId } });
            if (!store) throw new DomainError("La boutique associée n'existe pas", 400, 'Store', 'store not found');
            
            const supplier = await transactionalEntity.withRepository(this).findOneByArticleIdStore(supplierId, storeId);
            if (!supplier) throw new DomainError("Le fournisseur n'est pas associé à cette boutique", 400, 'Supplier', 'supplier not associated with this store');

            // Update fields if provided
            if (fieldUpdated.name) {
                supplier.name = fieldUpdated.name;
            }
            if (fieldUpdated.phone) {
                supplier.phone = fieldUpdated.phone;
            }
            // Save the updated supplier
            return await transactionalEntity.withRepository(this).save(supplier).catch((error) => {
                throw new AppException("Échec de mise à jour du fournisseur", 400, "APP_ERR_02", error.message);
            });
        } catch (error) {
            throw error;
        }
    },
    async getSupplierStore(storeId : number , supplierId? : number){
        try {
            const store = await StoreRepository.findOne({where : {id : storeId}});
            if (!store) throw new DomainError("Le store n'existe pas", 404, 'Store', 'store not found');
            let query = this.createQueryBuilder('supplier')
                        .where('supplier.storeId = :storeId', {storeId});
            if(supplierId){
                query = query.andWhere('supplier.id = :supplierId', {supplierId})
            }
            const suppliers = await query.getMany();
            return supplierMapper.toDtoArray(suppliers);
        } catch (error) {
            throw error
        }
    },
    async deleteSupplierStore(storeId : number , supplierId : number){
        try {
            const store = await StoreRepository.findOne({where : {id : storeId}});
            if (!store) throw new DomainError("Le store n'existe pas", 404, 'Store', 'store not found');

            const supplier = await this.findOneByArticleIdStore(supplierId, storeId);
            if (!supplier) throw new DomainError("Le fournisseur n'est pas associé à cette boutique", 400, 'Supplier', 'supplier not associated with this store');

            await this.remove(supplier).catch((error) => {
                throw new AppException("Échec de suppression du fournisseur", 400, "APP_ERR_01", error.reason);
            });
            return true

        } catch (error) {
           throw error 
        }

    }
    
});
