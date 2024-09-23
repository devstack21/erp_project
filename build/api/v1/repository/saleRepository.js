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
exports.SaleRepository = void 0;
const sale_models_1 = require("../db/models/sale.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const storeRepository_1 = require("./storeRepository");
const domainException_1 = require("../exception/domainException");
const saleItem_models_1 = require("../db/models/saleItem.models");
const saleItemRepository_1 = require("./saleItemRepository");
const articleRepository_1 = require("./articleRepository");
const AppException_1 = require("../exception/AppException");
const sale_mapper_1 = __importDefault(require("../mapper/sale.mapper"));
const handlerStockUtils_1 = __importDefault(require("../utils/handlerStockUtils"));
exports.SaleRepository = ormconfig_1.default.getRepository(sale_models_1.Sale).extend({
    createSale(transactionalEntity, saleLines, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield transactionalEntity.withRepository(storeRepository_1.StoreRepository).findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                const tmpSaleItems = [];
                let totalAmount = 0;
                for (const saleLine of saleLines) {
                    const saleItem = yield transactionalEntity.withRepository(saleItemRepository_1.SaleItemRepository)
                        .createSaleItemStore(saleLine, storeId);
                    totalAmount += saleLine.quantity * Number(saleItem.price);
                    tmpSaleItems.push(saleItem);
                }
                const sale = new sale_models_1.Sale();
                sale.totalAmount = totalAmount;
                sale.saleItems = tmpSaleItems;
                sale.store = store;
                return yield transactionalEntity.withRepository(this).save(sale).catch((error) => {
                    throw new AppException_1.AppException("Échec de création de la vente", 400, "APP_ERR_01", error.reason);
                });
            }
            catch (error) {
                throw error;
            }
        });
    },
    updateSale(transactionalEntity, storeId, saleId, saleLines) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield transactionalEntity.withRepository(storeRepository_1.StoreRepository).findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                const sale = yield transactionalEntity.withRepository(this).findOne({ where: { id: saleId }, relations: ['saleItems', 'saleItems.article'] });
                if (!sale)
                    throw new domainException_1.DomainError("La vente spécifiée n'existe pas", 400, 'Sale', 'ID sale not found');
                // Mettre à jour ou ajouter les SaleItem
                let totalAmount = 0;
                const existingSaleItems = sale.saleItems;
                // Créer un map pour suivre les articles mis à jour
                const updatedItemsMap = new Map();
                for (const saleLine of saleLines) {
                    const articleExist = yield transactionalEntity.withRepository(articleRepository_1.ArticleRepository).findOneByNameArticleStore(saleLine.article, storeId);
                    if (!articleExist)
                        throw new domainException_1.DomainError("L'article n'existe pas dans ce magasin", 400, 'Article', 'ID article not found');
                    //gérer l'erreur de stock 
                    handlerStockUtils_1.default.getCheckingTransactionStock(saleLine.article, articleExist.quantity, saleLine.quantity);
                    // Vérifier et mettre à jour ou ajouter SaleItem
                    const existingSaleItem = existingSaleItems.find(item => item.article.id === articleExist.id);
                    if (existingSaleItem) {
                        // Mettre à jour le SaleItem existant
                        existingSaleItem.quantity = Number(existingSaleItem.quantity) + Number(saleLine.quantity);
                        existingSaleItem.price = existingSaleItem.quantity * Number(articleExist.selling_price);
                        yield saleItemRepository_1.SaleItemRepository.save(existingSaleItem);
                    }
                    else {
                        // Ajouter un nouveau SaleItem
                        const newSaleItem = new saleItem_models_1.SaleItem();
                        newSaleItem.quantity = saleLine.quantity;
                        newSaleItem.price = saleLine.quantity * Number(articleExist.selling_price);
                        newSaleItem.article = articleExist;
                        sale.saleItems.push(yield saleItemRepository_1.SaleItemRepository.save(newSaleItem));
                    }
                    updatedItemsMap.set(articleExist.id, existingSaleItem);
                }
                // Calculer le montant total en fonction des mises à jour
                for (const saleItem of sale.saleItems) {
                    const saleItemDto = updatedItemsMap.get(saleItem.article.id);
                    if (saleItemDto) {
                        totalAmount += saleItemDto.price;
                    }
                    else {
                        totalAmount += saleItem.price;
                    }
                }
                sale.totalAmount = totalAmount;
                return yield transactionalEntity.withRepository(this).save(sale).catch((error) => {
                    throw new AppException_1.AppException("Échec de mise à jour de la vente", 400, "APP_ERR_01", error.reason);
                });
            }
            catch (error) {
                throw error;
            }
        });
    },
    getSaleStoreThisDay(storeId, saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999);
                let query = this.createQueryBuilder('sale')
                    .leftJoinAndSelect('sale.saleItems', 'saleItem')
                    .where('sale.storeId = :storeId', { storeId })
                    .andWhere('sale.createdAt BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay });
                if (saleId) {
                    //check sale if store
                    query = query.andWhere('sale.id = :saleId', { saleId });
                }
                const sales = yield query.getMany();
                return sale_mapper_1.default.toDtoArray(sales);
            }
            catch (error) {
                throw error;
            }
        });
    },
    getSalesByStore(storeId, saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store) {
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                }
                let query = this.createQueryBuilder('sale')
                    .leftJoinAndSelect('sale.saleItems', 'saleItem')
                    .leftJoinAndSelect('sale.invoices', 'invoice')
                    .where('sale.storeId = :storeId', { storeId });
                if (saleId) {
                    query = query.andWhere('sale.id = :saleId', { saleId });
                }
                const sales = yield query.getMany();
                return sale_mapper_1.default.toDtoArray(sales);
            }
            catch (error) {
                throw error;
            }
        });
    },
    getSaleById(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield this.findOne({
                where: { id: saleId },
                relations: ['saleItems', 'invoices']
            });
            return sale ? sale : undefined;
        });
    },
    findOneSaleByStore(storeId, saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store) {
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                }
                let query = this.createQueryBuilder('sale')
                    .leftJoinAndSelect('sale.saleItems', 'saleItem')
                    .where('sale.storeId = :storeId', { storeId })
                    .andWhere('sale.id = :saleId', { saleId });
                return yield query.getOne();
            }
            catch (error) {
                throw error;
            }
        });
    },
    getAllSales() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ relations: ['saleItems', 'invoices'] });
        });
    },
    registerInvoice(sale, invoice) {
        if (sale.invoices) {
            sale.invoices.push(invoice);
        }
        else {
            sale.invoices = [invoice];
        }
    }
});
