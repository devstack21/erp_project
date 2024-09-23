import { SaleItem } from '../db/models/saleItem.models';
import dbInstance from '../db/ormconfig';
import { ArticleRepository } from './articleRepository';
import { SaleItemDto } from '../dto/saleItem.dto';
import { DomainError } from '../exception/domainException';
import { AppException } from '../exception/AppException';
import handlerStockUtils from '../utils/handlerStockUtils';
export const SaleItemRepository = dbInstance.getRepository(SaleItem).extend({
    async createSaleItemStore(saleLine : SaleItemDto, storeId : number) : Promise<SaleItem>{
        try {
            const newSaleLine = new SaleItem()
            newSaleLine.quantity = saleLine.quantity
            const articleExist = await ArticleRepository.findOneByNameArticleStore(saleLine.article , storeId)
            if(!articleExist) throw new DomainError("L'article n'existe pas dans ce magasin", 400, 'Article', 'ID article not found')
            // check stock
            handlerStockUtils.getCheckingTransactionStock(saleLine.article , articleExist.quantity , saleLine.quantity)  
            // save price article
            newSaleLine.price = saleLine.quantity * Number(articleExist.selling_price)
            newSaleLine.article = articleExist
            return await this.save(newSaleLine).catch((error) =>{
                throw new AppException(`Échec de création de la ligne de vente de l'article ${saleLine.article}`, 400, "APP_ERR_01", error.reason)
            })
        } catch (error) {
            throw error
        }
    },
    async getSaleItemsBySaleId(saleId: number): Promise<SaleItem[]> {
        return this.find({
            where: { sale: { id: saleId } },
            relations: ['article']
        });
    }
});
