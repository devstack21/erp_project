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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleItemRepository = void 0;
const saleItem_models_1 = require("../db/models/saleItem.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const articleRepository_1 = require("./articleRepository");
const domainException_1 = require("../exception/domainException");
const AppException_1 = require("../exception/AppException");
const handlerStockUtils_1 = __importDefault(require("../utils/handlerStockUtils"));
exports.SaleItemRepository = ormconfig_1.default.getRepository(saleItem_models_1.SaleItem).extend({
    createSaleItemStore(saleLine, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newSaleLine = new saleItem_models_1.SaleItem();
                newSaleLine.quantity = saleLine.quantity;
                const articleExist = yield articleRepository_1.ArticleRepository.findOneByNameArticleStore(saleLine.article, storeId);
                if (!articleExist)
                    throw new domainException_1.DomainError("L'article n'existe pas dans ce magasin", 400, 'Article', 'ID article not found');
                // check stock
                handlerStockUtils_1.default.getCheckingTransactionStock(saleLine.article, articleExist.quantity, saleLine.quantity);
                // save price article
                newSaleLine.price = saleLine.quantity * Number(articleExist.selling_price);
                newSaleLine.article = articleExist;
                return yield this.save(newSaleLine).catch((error) => {
                    throw new AppException_1.AppException(`Échec de création de la ligne de vente de l'article ${saleLine.article}`, 400, "APP_ERR_01", error.reason);
                });
            }
            catch (error) {
                throw error;
            }
        });
    },
    getSaleItemsBySaleId(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({
                where: { sale: { id: saleId } },
                relations: ['article']
            });
        });
    }
});
