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
exports.InvoiceRepository = void 0;
const invoice_models_1 = require("../db/models/invoice.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const AppException_1 = require("../exception/AppException");
const saleRepository_1 = require("./saleRepository");
const storeRepository_1 = require("./storeRepository");
const invoiceMapper_1 = __importDefault(require("../mapper/invoiceMapper"));
const handlerStockUtils_1 = __importDefault(require("../utils/handlerStockUtils"));
const articleRepository_1 = require("./articleRepository");
const saleItemRepository_1 = require("./saleItemRepository");
exports.InvoiceRepository = ormconfig_1.default.getRepository(invoice_models_1.Invoice).extend({
    /**
     *
     * @param transactionalEntity
     * @param sale
     * @returns
     * @description 'Cette méthode permettra de générer une facture a partir d'une vente '
     */
    createInvoice(transactionalEntity, sale) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!sale)
                    throw new domainException_1.DomainError("Cette vente n'est pas defini correctement", 400, 'Sale', 'Sale is undefined or null');
                const newInvoince = new invoice_models_1.Invoice();
                newInvoince.totalAmount = sale.totalAmount;
                newInvoince.sale = sale;
                // push invoices in sale array
                return yield transactionalEntity.withRepository(this).save(newInvoince).catch((error) => {
                    throw new AppException_1.AppException("Échec de la vente", 400, "APP_ERR_01", error.reason);
                });
            }
            catch (error) {
                throw error;
            }
        });
    },
    /**
     *
     * @param transactionalEntity
     * @param invoiceId
     * @param totalAmount
     * @returns
     * @description 'Cette méthode permettra de modifier les détails d'une facture'
     */
    updateDetailsInvoice(transactionalEntity, invoiceId, totalAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoice = yield transactionalEntity.withRepository(this).findOne({ where: { id: invoiceId }, relations: ['sale'] });
                if (!invoice)
                    throw new domainException_1.DomainError("La facture spécifiée n'existe pas", 400, 'Invoice', 'ID invoice not found');
                const sale = yield transactionalEntity.withRepository(saleRepository_1.SaleRepository).findOne({ where: { id: invoice.sale.id } });
                if (!sale)
                    throw new domainException_1.DomainError("La vente associée à la facture n'existe pas", 400, 'Sale', 'Sale not found');
                if (totalAmount) {
                    invoice.totalAmount = totalAmount;
                }
                // Mettre à jour la facture dans la base de données
                return yield transactionalEntity.withRepository(this).save(invoice).catch((error) => {
                    throw new AppException_1.AppException("Échec de mise à jour de la facture", 400, "APP_ERR_01", error.reason);
                });
            }
            catch (error) {
                throw error;
            }
        });
    },
    getInvoiceById(invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield this.findOne({
                where: { id: invoiceId },
                relations: ['sale', 'store']
            });
            return invoice ? invoice : undefined;
        });
    },
    /**
     *
     * @param storeId
     * @param invoiceId
     * @returns
     * @description 'Cette méthode sera utilisée pour afficher les factures d'une boutique'
     */
    getInvoicesByStore(storeId, invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                let query = this.createQueryBuilder('invoice')
                    .leftJoinAndSelect('invoice.sale', 'sale')
                    .leftJoinAndSelect('sale.store', 'store')
                    .where('store.id = :storeId', { storeId });
                if (invoiceId) {
                    query = query.andWhere('invoice.id = :invoiceId', { invoiceId });
                }
                const invoices = yield query.getMany();
                return invoiceMapper_1.default.toDtoArray(invoices);
            }
            catch (error) {
                throw error;
            }
        });
    },
    /**
     *
     * @param storeId
     * @param invoiceId
     * @returns
     * @description 'Cette méthode sera utilisée pour afficher les factures journalières d'une boutique'
     */
    getInvoicesByStoreThisDay(storeId, invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999);
                let query = this.createQueryBuilder('invoice')
                    .leftJoinAndSelect('invoice.sale', 'sale')
                    .leftJoinAndSelect('sale.store', 'store')
                    .where('store.id = :storeId', { storeId })
                    .andWhere('invoice.createdAt BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay });
                if (invoiceId) {
                    query = query.andWhere('invoice.id = :invoiceId', { invoiceId });
                }
                const invoices = yield query.getMany();
                return invoiceMapper_1.default.toDtoArray(invoices);
            }
            catch (error) {
                throw error;
            }
        });
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
    updateStatusInvoice(transactionalEntity, storeId, invoiceId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield transactionalEntity.withRepository(storeRepository_1.StoreRepository).findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                let query = this.createQueryBuilder('invoice')
                    .leftJoinAndSelect('invoice.sale', 'sale')
                    .leftJoinAndSelect('sale.store', 'store')
                    .leftJoinAndSelect('sale.saleItems', 'saleItem')
                    .leftJoinAndSelect('saleItem.article', 'article')
                    .where('store.id = :storeId', { storeId })
                    .andWhere('invoice.id = :invoiceId', { invoiceId });
                const invoice = yield query.getOne();
                if (!invoice)
                    throw new domainException_1.DomainError("L'identifiant de cette facture n'existe pas", 400, 'Invoice', 'ID invoice not found');
                //si le statut de la facture est déja payée ou perdue
                if (invoice.status === 'Payé' || invoice.status == 'Perte') {
                    return invoice;
                }
                if (status === 'Payé') {
                    // update stock article
                    const saleItems = invoice.sale.saleItems;
                    for (let saleItem of saleItems) {
                        const articleExist = yield transactionalEntity.withRepository(articleRepository_1.ArticleRepository).findOneByNameArticleStore(saleItem.article.name, storeId);
                        if (!articleExist)
                            throw new domainException_1.DomainError("L'article n'existe pas dans ce magasin", 400, 'Article', 'ID article not found');
                        // gerer l'erreur liée a une rupture de stock 
                        const stockUpdated = handlerStockUtils_1.default.getCheckingTransactionStock(saleItem.article.name, articleExist.quantity, saleItem.quantity);
                        const articleStockUpdated = yield transactionalEntity.withRepository(articleRepository_1.ArticleRepository).updateArticle(transactionalEntity, storeId, articleExist.id, { quantity: stockUpdated });
                        saleItem.article = articleStockUpdated;
                        yield transactionalEntity.withRepository(saleItemRepository_1.SaleItemRepository).save(saleItem).catch((error) => {
                            throw new AppException_1.AppException(`Échec de la mise a jour de la ligne de vente de l'article ${saleItem.article.name}`, 400, "APP_ERR_01", error.reason);
                        });
                    }
                }
                if (status === 'A crédit') {
                    // --- if cron check invoice credit is ON ---
                    // define time delay for buying after in days 
                    // -> (JJ/MM/YY)&& hour.payment -- if date.now  == time.buying.after and hour.now > hour.payment: invoice.status = UNPAID
                    // time delays for change 
                    // if day.now > day.time.delay : invoice.status = LOST
                }
                invoice.status = status;
                return yield transactionalEntity.withRepository(this).save(invoice).catch((error) => {
                    throw new AppException_1.AppException("Échec de mise à jour de la facture", 400, "APP_ERR_01", error.reason);
                });
            }
            catch (error) {
                throw error;
            }
        });
    },
    /**
     *
     * @param storeId
     * @param status
     * @returns
     * @description 'Cette méthode permet de filtrer les factures selon leurs statuts'
     */
    getInvoiceByStatus(storeId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                let query = this.createQueryBuilder('invoice')
                    .leftJoinAndSelect('invoice.sale', 'sale')
                    .leftJoinAndSelect('sale.store', 'store')
                    .leftJoinAndSelect('sale.saleItems', 'saleItem')
                    .where('invoice.status = :status', { status })
                    .andWhere('store.id = :storeId', { storeId });
                const invoices = yield query.getMany();
                return invoiceMapper_1.default.toDtoArray(invoices);
            }
            catch (error) {
                throw error;
            }
        });
    },
});
