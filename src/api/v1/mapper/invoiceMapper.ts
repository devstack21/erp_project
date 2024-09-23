import { Invoice } from "../db/models/invoice.models";
import { InvoiceDto } from "../dto/invoice.dto";
import { MapperI } from "./mapperI/mapperI";
import { SaleItemDto } from "../dto/saleItem.dto";
import { SaleItemRepository } from "../repository/saleItemRepository";
import { DomainError } from "../exception/domainException";
import { ArticleRepository } from "../repository/articleRepository";

class invoiceMapper implements MapperI{

    async toDto(invoice: Invoice) : Promise<InvoiceDto> {
        const invoiceDto = new InvoiceDto()
        invoiceDto.id = invoice.id 
        invoiceDto.totalAmount = invoice.totalAmount
        invoiceDto.status = invoice.status
        invoiceDto.saleItems = await this.getDataSaleInvoiceItems(invoice)
        return invoiceDto
    }
    async toDtoArray(invoices: Invoice[]) : Promise<InvoiceDto[]>{
        return Promise.all(invoices.map(invoice => this.toDto(invoice)))
    }

    private async getDataSaleInvoiceItems(invoice: Invoice): Promise<SaleItemDto[]> {
        const saleItemsTmp: SaleItemDto[] = [];
        
        const saleItems = await SaleItemRepository.getSaleItemsBySaleId(invoice.sale.id);
        console.log(saleItems)
        
        if (saleItems.length === 0) {
            throw new DomainError("Les lignes de vente sont nulles pour cette facture", 400, "SaleItem", "Sale items array empty");
        }

        const articleIds = saleItems.map(item => item.article.id); 
        const articles = await ArticleRepository.findByArticleIds(articleIds);
        const articleMap = new Map(articles.map(article => [article.id, article]));

        for (const saleItem of saleItems) {
            const saleItemDto = new SaleItemDto();
            const article = articleMap.get(saleItem.article.id);

            if (!article) {
                throw new DomainError("Cet article n'existe pas", 400, "Article", "Article not found");
            }
            saleItemDto.article = article.name;
            saleItemDto.price = saleItem.price;
            saleItemDto.quantity = saleItem.quantity;
            saleItemsTmp.push(saleItemDto);
        }
        return saleItemsTmp;
    }
   
}
export default new invoiceMapper()