
import { Sale } from '../db/models/sale.models';
import dbInstance from '../db/ormconfig';
import { SaleItemDto } from '../dto/saleItem.dto';
import { StoreRepository } from './storeRepository';
import { DomainError } from '../exception/domainException';
import { SaleItem } from '../db/models/saleItem.models';
import { SaleItemRepository } from './saleItemRepository';
import { ArticleRepository } from './articleRepository';
import { AppException } from '../exception/AppException';
import { Invoice } from '../db/models/invoice.models';
import { SaleDto } from '../dto/sale.dto';
import saleMapper from '../mapper/sale.mapper';
import handlerStockUtils from '../utils/handlerStockUtils';
import { EntityManager } from 'typeorm';
export const SaleRepository = dbInstance.getRepository(Sale).extend({
    async createSale(transactionalEntity : EntityManager , saleLines : SaleItemDto[], storeId :  number) : Promise<Sale>{
        try {  
            const store = await transactionalEntity.withRepository(StoreRepository).findOne({where : {id : storeId}})
            if(!store) throw new DomainError("L'identifiant de la boutique n'existe pas", 400,'Store', 'ID store not found')
            const tmpSaleItems : Array<SaleItem> = []
            let totalAmount : number = 0
            for(const saleLine of saleLines){
                const saleItem = await transactionalEntity.withRepository(SaleItemRepository)
                                .createSaleItemStore(saleLine , storeId)
                totalAmount += saleLine.quantity * Number(saleItem.price);
                tmpSaleItems.push(saleItem)
            }
            const sale = new Sale()
            sale.totalAmount = totalAmount 
            sale.saleItems = tmpSaleItems
            sale.store = store
            return await transactionalEntity.withRepository(this).save(sale).catch((error)=>{
                throw new AppException("Échec de création de la vente", 400, "APP_ERR_01", error.reason);
            })
        }catch(error) {
            throw error
            }
        },
        async updateSale(transactionalEntity : EntityManager, storeId: number,saleId: number, saleLines: SaleItemDto[]): Promise<Sale> {
            try { 
                const store = await transactionalEntity.withRepository(StoreRepository).findOne({ where: { id: storeId } });
                if (!store) throw new DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
    
                const sale = await transactionalEntity.withRepository(this).findOne({ where: { id: saleId }, relations: ['saleItems', 'saleItems.article'] });
                if (!sale) throw new DomainError("La vente spécifiée n'existe pas", 400, 'Sale', 'ID sale not found');
    
                // Mettre à jour ou ajouter les SaleItem
                let totalAmount = 0;
                const existingSaleItems = sale.saleItems;

                // Créer un map pour suivre les articles mis à jour
                const updatedItemsMap = new Map<number, SaleItem | undefined>();
    
                for (const saleLine of saleLines) {
                    const articleExist = await transactionalEntity.withRepository(ArticleRepository).findOneByNameArticleStore(saleLine.article, storeId);
                    if (!articleExist) throw new DomainError("L'article n'existe pas dans ce magasin", 400, 'Article', 'ID article not found');
                    
                    //gérer l'erreur de stock 
                    handlerStockUtils.getCheckingTransactionStock(saleLine.article, articleExist.quantity, saleLine.quantity);
        
                    // Vérifier et mettre à jour ou ajouter SaleItem
                    const existingSaleItem = existingSaleItems.find(item => item.article.id === articleExist.id);
                    
                    if (existingSaleItem) {
                        // Mettre à jour le SaleItem existant
                        existingSaleItem.quantity = Number(existingSaleItem.quantity) + Number(saleLine.quantity);
                        existingSaleItem.price = existingSaleItem.quantity * Number(articleExist.selling_price);
                        await SaleItemRepository.save(existingSaleItem);
                    } else {
                        // Ajouter un nouveau SaleItem
                        const newSaleItem = new SaleItem();
                        newSaleItem.quantity = saleLine.quantity;
                        newSaleItem.price = saleLine.quantity * Number(articleExist.selling_price);
                        newSaleItem.article = articleExist;
                        sale.saleItems.push(await SaleItemRepository.save(newSaleItem));     
                    }
                    updatedItemsMap.set(articleExist.id, existingSaleItem); 
                }
                // Calculer le montant total en fonction des mises à jour
                for (const saleItem of sale.saleItems) {
                    const saleItemDto = updatedItemsMap.get(saleItem.article.id);
                    if (saleItemDto) {
                        totalAmount += saleItemDto.price
                    } else {
                        totalAmount += saleItem.price; 
                    }
                }
                sale.totalAmount = totalAmount;
                return await transactionalEntity.withRepository(this).save(sale).catch((error) => {
                    throw new AppException("Échec de mise à jour de la vente", 400, "APP_ERR_01", error.reason);
                });
            } catch (error) {
                throw error;
            }
        }
        ,
        async getSaleStoreThisDay(storeId: number, saleId?: number): Promise<SaleDto[]> {
            try {
                const store = await StoreRepository.findOne({ where: { id: storeId } });
                if (!store) throw new DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
        
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0); 
        
                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999); 
        
                let query = this.createQueryBuilder('sale')
                    .leftJoinAndSelect('sale.saleItems', 'saleItem')
                    .where('sale.storeId = :storeId', { storeId })
                    .andWhere('sale.createdAt BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
                
                if (saleId) {
                    //check sale if store
                    query = query.andWhere('sale.id = :saleId', { saleId });
                }
                const sales = await query.getMany();
                return saleMapper.toDtoArray(sales);
            } catch (error) {
                throw error
            }
        },
        async getSalesByStore(storeId: number, saleId?: number): Promise<SaleDto[]> {
            try {
                const store = await StoreRepository.findOne({ where: { id: storeId } });
                if (!store) {
                    throw new DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                }
                let query = this.createQueryBuilder('sale')
                    .leftJoinAndSelect('sale.saleItems', 'saleItem')
                    .leftJoinAndSelect('sale.invoices', 'invoice')
                    .where('sale.storeId = :storeId', { storeId });
                    
                if (saleId) {
                    query = query.andWhere('sale.id = :saleId', { saleId });
                }
                const sales = await query.getMany();
    
                return saleMapper.toDtoArray(sales);
            } catch (error) {
                throw error;
            }
        },
    async getSaleById(saleId: number): Promise<Sale | undefined> {
        const sale = await this.findOne({
            where: { id: saleId },
            relations: ['saleItems', 'invoices']
        });
        return sale ? sale : undefined
    },
    async findOneSaleByStore(storeId : number , saleId : number) : Promise <Sale | null>{
        try {
            const store = await StoreRepository.findOne({ where: { id: storeId } });
                if (!store) {
                    throw new DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                }
                let query = this.createQueryBuilder('sale')
                    .leftJoinAndSelect('sale.saleItems', 'saleItem')
                    .where('sale.storeId = :storeId', { storeId })
                    .andWhere('sale.id = :saleId', { saleId })
            
                return await query.getOne()
        } catch (error) {
            throw error
        }
    },
    async getAllSales(): Promise<Sale[]> {
        return this.find({ relations: ['saleItems', 'invoices'] });
    },
    registerInvoice(sale : Sale , invoice : Invoice ){
        if (sale.invoices) {
            sale.invoices.push(invoice);
        } else {
            sale.invoices = [invoice];
        }
    }
});
