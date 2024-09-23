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
const saleRepository_1 = require("../repository/saleRepository");
const handlerException_1 = __importDefault(require("../handlerException/handlerException"));
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const invoiceRepository_1 = require("../repository/invoiceRepository");
class SaleService {
    constructor(validationErrorSaleItem) {
        this.saleRepository = saleRepository_1.SaleRepository;
        this.invoiceRepository = invoiceRepository_1.InvoiceRepository;
        this.validationErrorSaleItem = validationErrorSaleItem;
    }
    createSale(saleLines, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.validationErrorSaleItem.responseValidationSaleItems(saleLines);
                const sale = yield ormconfig_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                    const transactionalSaleRepository = manager.withRepository(this.saleRepository);
                    const transactionalInvoiceRepository = manager.withRepository(this.invoiceRepository);
                    const sale = yield transactionalSaleRepository.createSale(manager, saleLines, storeId);
                    //generate invoice 
                    const invoice = yield transactionalInvoiceRepository.createInvoice(manager, sale);
                    transactionalSaleRepository.registerInvoice(sale, invoice);
                    return sale;
                }));
                return {
                    status: 201,
                    message: 'La vente a été créée avec succès',
                    id: sale.id
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getSaleStoreThisDay(storeId, saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield this.saleRepository.getSaleStoreThisDay(storeId, saleId);
                return {
                    status: 200,
                    response_data: sales
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getSaleByStore(storeId, saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield this.saleRepository.getSalesByStore(storeId, saleId);
                return {
                    status: 200,
                    response_data: sales
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
}
exports.default = SaleService;
