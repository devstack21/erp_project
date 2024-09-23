
import { Invoice } from '../db/models/invoice.models';
import dbInstance from '../db/ormconfig';
import { Sale } from '../db/models/sale.models';
import { DomainError } from '../exception/domainException';
import { AppException } from '../exception/AppException';
import { SaleRepository } from './saleRepository';
import { StoreRepository } from './storeRepository';
import invoiceMapper from '../mapper/invoiceMapper';
import { InvoiceDto } from '../dto/invoice.dto';
import { InvoiceTransactionStatus } from '../enum/enum.cte';
import handlerStockUtils from '../utils/handlerStockUtils';
import { ArticleRepository } from './articleRepository';
import { SaleItemRepository } from './saleItemRepository';
import { EntityManager } from 'typeorm';
export const InvoiceRepository = dbInstance.getRepository(Invoice).extend({
    /**
     * 
     * @param transactionalEntity 
     * @param sale 
     * @returns 
     * @description 'Cette méthode permettra de générer une facture a partir d'une vente '
     */
    async createInvoice(transactionalEntity : EntityManager ,sale : Sale ){
        try {
            if(!sale) throw new DomainError("Cette vente n'est pas defini correctement", 400,'Sale', 'Sale is undefined or null')
                const newInvoince = new Invoice()
                newInvoince.totalAmount = sale.totalAmount
                newInvoince.sale = sale
                // push invoices in sale array
                return await transactionalEntity.withRepository(this).save(newInvoince).catch((error) =>{
                    throw new AppException("Échec de la vente", 400, "APP_ERR_01", error.reason);
                }) 
        } catch (error) {
            throw error
        }
    },
    /**
     * 
     * @param transactionalEntity 
     * @param invoiceId 
     * @param totalAmount 
     * @returns 
     * @description 'Cette méthode permettra de modifier les détails d'une facture'
     */
    async updateDetailsInvoice(transactionalEntity : EntityManager, invoiceId: number, totalAmount : number): Promise<Invoice> {
        try {
           
            const invoice = await transactionalEntity.withRepository(this).findOne({ where: { id: invoiceId }, relations: ['sale'] });
            if (!invoice) throw new DomainError("La facture spécifiée n'existe pas", 400, 'Invoice', 'ID invoice not found')
           
            const sale = await transactionalEntity.withRepository(SaleRepository).findOne({ where: { id: invoice.sale.id } });
            if (!sale) throw new DomainError("La vente associée à la facture n'existe pas", 400, 'Sale', 'Sale not found');

            if (totalAmount) {
                invoice.totalAmount = totalAmount;
            }
        
            // Mettre à jour la facture dans la base de données
            return await transactionalEntity.withRepository(this).save(invoice).catch((error) => {
                throw new AppException("Échec de mise à jour de la facture", 400, "APP_ERR_01", error.reason);
            });
            
        } catch (error) {
            throw error;
        }
    },
    async getInvoiceById(invoiceId: number): Promise<Invoice | undefined> {
        const invoice = await this.findOne({
            where: { id: invoiceId },
            relations: ['sale', 'store']
        });
        return invoice ? invoice : undefined
    },
    /**
     * 
     * @param storeId 
     * @param invoiceId 
     * @returns 
     * @description 'Cette méthode sera utilisée pour afficher les factures d'une boutique'
     */
    async getInvoicesByStore(storeId : number ,invoiceId?:number): Promise<InvoiceDto[]> {

        try {
            const store = await StoreRepository.findOne({where : {id : storeId}})
            if(!store) throw new DomainError("L'identifiant de la boutique n'existe pas", 400,'Store', 'ID store not found')

            let query = this.createQueryBuilder('invoice')
                            .leftJoinAndSelect('invoice.sale', 'sale')          
                            .leftJoinAndSelect('sale.store', 'store')            
                            .where('store.id = :storeId', { storeId }); 
            
            if (invoiceId) {   
                query = query.andWhere('invoice.id = :invoiceId', { invoiceId });
            }
            const invoices = await query.getMany()
            return invoiceMapper.toDtoArray(invoices);
        } catch (error) {
            throw error
        }
    },
    /**
     * 
     * @param storeId 
     * @param invoiceId 
     * @returns 
     * @description 'Cette méthode sera utilisée pour afficher les factures journalières d'une boutique'
     */
    async getInvoicesByStoreThisDay(storeId: number, invoiceId?:number): Promise<InvoiceDto[]> {
        try {
            const store = await StoreRepository.findOne({where : {id : storeId}})
            if(!store) throw new DomainError("L'identifiant de la boutique n'existe pas", 400,'Store', 'ID store not found')
                
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0); 
        
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999); 

            let query = this.createQueryBuilder('invoice')
                    .leftJoinAndSelect('invoice.sale', 'sale')          
                    .leftJoinAndSelect('sale.store', 'store')            
                    .where('store.id = :storeId', { storeId })
                    .andWhere('invoice.createdAt BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
            
            if (invoiceId) {
                query = query.andWhere('invoice.id = :invoiceId', { invoiceId });
            }
            const invoices = await query.getMany()
            return invoiceMapper.toDtoArray(invoices);
        } catch (error) {
            throw error
        }
    },
    /**
     * 
     * @param transactionalEntity 
     * @param storeId 
     * @param invoiceId 
     * @param status 
     * @returns 
     * @description 'cette méthode sera  utilisé pour le valider le paiement de la facture et pour annuler la facture'
     */
    async updateStatusInvoice(transactionalEntity : EntityManager ,storeId: number , invoiceId: number , status : InvoiceTransactionStatus){
        try {
                const store = await transactionalEntity.withRepository(StoreRepository).findOne({where : {id : storeId}})
                if(!store) throw new DomainError("L'identifiant de la boutique n'existe pas", 400,'Store', 'ID store not found')
            
                let query = this.createQueryBuilder('invoice')
                    .leftJoinAndSelect('invoice.sale', 'sale')
                    .leftJoinAndSelect('sale.store', 'store')
                    .leftJoinAndSelect('sale.saleItems', 'saleItem') 
                    .leftJoinAndSelect('saleItem.article', 'article')
                    .where('store.id = :storeId', { storeId })
                    .andWhere('invoice.id = :invoiceId', { invoiceId });

                const invoice = await query.getOne()  
                
                if(!invoice) throw new DomainError("L'identifiant de cette facture n'existe pas", 400,'Invoice', 'ID invoice not found')   

                //si le statut de la facture est déja payée ou perdue
                if (invoice.status === 'Payé' || invoice.status == 'Perte') { 
                    return invoice; }
      
                if(status === 'Payé') {
                    // update stock article
                    const saleItems  = invoice.sale.saleItems
                    for (let saleItem of saleItems){
                        const articleExist = await transactionalEntity.withRepository(ArticleRepository).findOneByNameArticleStore(saleItem.article.name , storeId)
                        if(!articleExist) throw new DomainError("L'article n'existe pas dans ce magasin", 400, 'Article', 'ID article not found')
                        // gerer l'erreur liée a une rupture de stock 
                        const stockUpdated : number = handlerStockUtils.getCheckingTransactionStock(saleItem.article.name , articleExist.quantity , saleItem.quantity)  
                        const articleStockUpdated = await transactionalEntity.withRepository(ArticleRepository).updateArticle(transactionalEntity ,storeId ,articleExist.id, {quantity : stockUpdated})
                        saleItem.article = articleStockUpdated
                        await transactionalEntity.withRepository(SaleItemRepository).save(saleItem).catch((error) =>{
                            throw new AppException(`Échec de la mise a jour de la ligne de vente de l'article ${saleItem.article.name}`, 400, "APP_ERR_01", error.reason)
                        })
                    }
                }

                if(status === 'A crédit'){
                    // --- if cron check invoice credit is ON ---
                    // define time delay for buying after in days 
                    // -> (JJ/MM/YY)&& hour.payment -- if date.now  == time.buying.after and hour.now > hour.payment: invoice.status = UNPAID
                    // time delays for change 
                    // if day.now > day.time.delay : invoice.status = LOST
                }
                invoice.status = status 
                return await transactionalEntity.withRepository(this).save(invoice).catch((error) => {
                    throw new AppException("Échec de mise à jour de la facture", 400, "APP_ERR_01", error.reason);
                });
        } catch (error) {
            throw error
        }
    },
    /**
     * 
     * @param storeId 
     * @param status 
     * @returns 
     * @description 'Cette méthode permet de filtrer les factures selon leurs statuts'
     */
    async getInvoiceByStatus(storeId : number  , status : InvoiceTransactionStatus) : Promise<InvoiceDto[]>{
        try {
            const store = await StoreRepository.findOne({where : {id : storeId}})
            if(!store) throw new DomainError("L'identifiant de la boutique n'existe pas", 400,'Store', 'ID store not found')
            
            let query = this.createQueryBuilder('invoice')
                    .leftJoinAndSelect('invoice.sale', 'sale')
                    .leftJoinAndSelect('sale.store', 'store')
                    .leftJoinAndSelect('sale.saleItems', 'saleItem') 
                    .where('invoice.status = :status', { status })
                    .andWhere('store.id = :storeId', { storeId })

            const invoices = await query.getMany()
            return invoiceMapper.toDtoArray(invoices)
        } catch (error) {
            throw error
        }
    }, 
});
