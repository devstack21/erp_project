import { MapperI } from "./mapperI/mapperI";
import { Sale } from "../db/models/sale.models";
import { SaleDto } from "../dto/sale.dto";
import { SaleItemDto } from "../dto/saleItem.dto";
import { SaleItemRepository } from "../repository/saleItemRepository";
import { DomainError } from "../exception/domainException";
import { ArticleRepository } from "../repository/articleRepository";

class SaleMapper implements MapperI{

    async toDto(sale: Sale) : Promise<SaleDto> {
        const saleDto = new SaleDto()
        saleDto.id = sale.id
        saleDto.totalAmount = sale.totalAmount
        saleDto.saleItems = await this.getDataSaleItems(sale)
        saleDto.methodPayment = sale.methodPayment
        return saleDto
    }
    async toDtoArray(sales: Sale[]) : Promise<SaleDto[]>{
        return Promise.all(sales.map( sale => this.toDto(sale)))
    }
    private async getDataSaleItems(sale : Sale) : Promise<SaleItemDto[]>{
        
        const saleItemsTmp : SaleItemDto[] =  []
        const saleItems =  await SaleItemRepository.getSaleItemsBySaleId(sale.id)
        if(saleItems.length == 0) throw new DomainError("Les lignes de vente sont nulles pour cette vente", 400 ,"SakeItem", "sale items array empty")  
        for(const saleItem of saleItems){
            const saleItemDto = new SaleItemDto()
            const article = await ArticleRepository.findByArticleId(saleItem.article.id)
            if(!article)throw new DomainError("Cet article n'existe pas", 400 ,"Article", "article not found")
            saleItemDto.id = saleItem.id
            saleItemDto.article = article.name
            saleItemDto.price = saleItem.price
            saleItemDto.quantity = saleItem.quantity
            saleItemsTmp.push(saleItemDto)
        }
        return saleItemsTmp
    }
}
export default new SaleMapper()