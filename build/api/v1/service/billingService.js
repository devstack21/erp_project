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
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const handlerException_1 = __importDefault(require("../handlerException/handlerException"));
const invoiceRepository_1 = require("../repository/invoiceRepository");
const saleRepository_1 = require("../repository/saleRepository");
const domainException_1 = require("../exception/domainException");
const AppException_1 = require("../exception/AppException");
class BillingService {
    constructor(validationErrorSaleItem) {
        this.invoiceRepository = invoiceRepository_1.InvoiceRepository;
        this.saleRepository = saleRepository_1.SaleRepository;
        this.validationErrorSaleItem = validationErrorSaleItem;
    }
    getInvoiceByStoreThisDay(storeId, invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoices = yield this.invoiceRepository.getInvoicesByStoreThisDay(storeId, invoiceId);
                return {
                    status: 200,
                    response_data: invoices
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    updateDetailsInvoiceNotPaid(storeId, invoiceId, saleLines) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //validate saleLines 
                yield this.validationErrorSaleItem.responseValidationSaleItems(saleLines);
                //transaction update invoice
                const invoice = yield ormconfig_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                    const transactionalInvoiceRepository = manager.withRepository(this.invoiceRepository);
                    const transactionalSaleRepository = manager.withRepository(this.saleRepository);
                    //check invoice exist
                    const invoiceExist = yield transactionalInvoiceRepository.findOne({ where: { id: invoiceId }, relations: ['sale'] });
                    if (!invoiceExist)
                        throw new domainException_1.DomainError("La facture spécifiée n'existe pas", 400, 'Invoice', 'ID invoice not found');
                    // check if statut invoice is not paid 
                    if (invoiceExist.status === 'Payé')
                        throw new AppException_1.AppException("Impossible de modifier une facture déja payée", 400, "APP_ERR_01", "status invoice is PAID");
                    if (invoiceExist.status === 'Perte')
                        throw new AppException_1.AppException("Impossible de modifier une facture perdue", 400, "APP_ERR_01", "status invoice is LOST");
                    //update saleLines sale 
                    const saleUpdated = yield transactionalSaleRepository.updateSale(manager, storeId, invoiceExist.sale.id, saleLines);
                    //update invoice
                    const updatedInvoice = yield transactionalInvoiceRepository.updateDetailsInvoice(manager, invoiceId, saleUpdated.totalAmount);
                    return updatedInvoice;
                }));
                return {
                    message: "La mise a jour de la facture réussie",
                    status: 200,
                    response_data: invoice
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getInvoiceByStore(storeId, invoiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoices = yield this.invoiceRepository.getInvoicesByStore(storeId, invoiceId);
                return {
                    status: 200,
                    response_data: invoices
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    updateStatusInvoice(storeId, invoiceId, statusInvoice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoiceStatusUpdated = yield ormconfig_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                    const transactionalInvoiceRepository = manager.withRepository(this.invoiceRepository);
                    return yield transactionalInvoiceRepository.updateStatusInvoice(manager, storeId, invoiceId, statusInvoice);
                }));
                return {
                    status: 200,
                    message: "Le statut de la facture a été modifié avec succès",
                    id: invoiceStatusUpdated.id
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getInvoiceByStatus(storeId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoices = yield this.invoiceRepository.getInvoiceByStatus(storeId, status);
                return {
                    status: 200,
                    response_data: invoices
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
}
exports.default = BillingService;
