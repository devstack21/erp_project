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
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_dto_1 = require("../dto/invoice.dto");
const saleItem_dto_1 = require("../dto/saleItem.dto");
const saleItemRepository_1 = require("../repository/saleItemRepository");
const domainException_1 = require("../exception/domainException");
const articleRepository_1 = require("../repository/articleRepository");
class invoiceMapper {
    toDto(invoice) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoiceDto = new invoice_dto_1.InvoiceDto();
            invoiceDto.id = invoice.id;
            invoiceDto.totalAmount = invoice.totalAmount;
            invoiceDto.status = invoice.status;
            invoiceDto.saleItems = yield this.getDataSaleInvoiceItems(invoice);
            return invoiceDto;
        });
    }
    toDtoArray(invoices) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(invoices.map(invoice => this.toDto(invoice)));
        });
    }
    getDataSaleInvoiceItems(invoice) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleItemsTmp = [];
            const saleItems = yield saleItemRepository_1.SaleItemRepository.getSaleItemsBySaleId(invoice.sale.id);
            console.log(saleItems);
            if (saleItems.length === 0) {
                throw new domainException_1.DomainError("Les lignes de vente sont nulles pour cette facture", 400, "SaleItem", "Sale items array empty");
            }
            const articleIds = saleItems.map(item => item.article.id);
            const articles = yield articleRepository_1.ArticleRepository.findByArticleIds(articleIds);
            const articleMap = new Map(articles.map(article => [article.id, article]));
            for (const saleItem of saleItems) {
                const saleItemDto = new saleItem_dto_1.SaleItemDto();
                const article = articleMap.get(saleItem.article.id);
                if (!article) {
                    throw new domainException_1.DomainError("Cet article n'existe pas", 400, "Article", "Article not found");
                }
                saleItemDto.article = article.name;
                saleItemDto.price = saleItem.price;
                saleItemDto.quantity = saleItem.quantity;
                saleItemsTmp.push(saleItemDto);
            }
            return saleItemsTmp;
        });
    }
}
exports.default = new invoiceMapper();
