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
const sale_dto_1 = require("../dto/sale.dto");
const saleItem_dto_1 = require("../dto/saleItem.dto");
const saleItemRepository_1 = require("../repository/saleItemRepository");
const domainException_1 = require("../exception/domainException");
const articleRepository_1 = require("../repository/articleRepository");
class SaleMapper {
    toDto(sale) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleDto = new sale_dto_1.SaleDto();
            saleDto.id = sale.id;
            saleDto.totalAmount = sale.totalAmount;
            saleDto.saleItems = yield this.getDataSaleItems(sale);
            saleDto.methodPayment = sale.methodPayment;
            return saleDto;
        });
    }
    toDtoArray(sales) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(sales.map(sale => this.toDto(sale)));
        });
    }
    getDataSaleItems(sale) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleItemsTmp = [];
            const saleItems = yield saleItemRepository_1.SaleItemRepository.getSaleItemsBySaleId(sale.id);
            if (saleItems.length == 0)
                throw new domainException_1.DomainError("Les lignes de vente sont nulles pour cette vente", 400, "SakeItem", "sale items array empty");
            for (const saleItem of saleItems) {
                const saleItemDto = new saleItem_dto_1.SaleItemDto();
                const article = yield articleRepository_1.ArticleRepository.findByArticleId(saleItem.article.id);
                if (!article)
                    throw new domainException_1.DomainError("Cet article n'existe pas", 400, "Article", "article not found");
                saleItemDto.id = saleItem.id;
                saleItemDto.article = article.name;
                saleItemDto.price = saleItem.price;
                saleItemDto.quantity = saleItem.quantity;
                saleItemsTmp.push(saleItemDto);
            }
            return saleItemsTmp;
        });
    }
}
exports.default = new SaleMapper();
