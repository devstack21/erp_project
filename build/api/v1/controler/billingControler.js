"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const billingService_1 = __importDefault(require("../service/billingService"));
const enum_cte_1 = require("../enum/enum.cte");
const validationError_saleItem_1 = __importDefault(require("../utils/validationError.saleItem"));
class BillingControler {
    constructor(billingService) {
        this.getInvoiceByStoreThisDay = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant du magasin n'est pas defini" });
            const invoiceId = request.query.invoice ? parseInt(request.query.invoice, 10) : 0;
            this.billingService.getInvoiceByStoreThisDay(storeId, invoiceId)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getInvoiceByStore = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant du magasin n'est pas defini" });
            const invoiceId = request.query.invoice ? parseInt(request.query.invoice, 10) : 0;
            this.billingService.getInvoiceByStore(storeId, invoiceId)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getInvoiceByStatus = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant du magasin n'est pas défini" });
            const statusInvoice = request.query.status;
            if (!statusInvoice)
                return response.json({ status: 400, message: "Le statut de la facture n'est pas défini" });
            // Vérifiez si le statut est valide
            const statusEnum = Object.values(enum_cte_1.InvoiceTransactionStatus).includes(statusInvoice);
            if (!statusEnum)
                return response.json({ status: 400, message: "Le statut de la facture est invalide" });
            this.billingService.getInvoiceByStatus(storeId, statusInvoice)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.updateStatusInvoice = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant du magasin n'est pas défini" });
            const invoiceId = request.query.invoice ? parseInt(request.query.invoice, 10) : 0;
            if (!invoiceId)
                return response.json({ status: 400, message: "L'identifiant de la facture n'est pas défini" });
            const statusInvoice = request.query.status;
            if (!statusInvoice)
                return response.json({ status: 400, message: "Le statut de la facture n'est pas défini" });
            // Vérifiez si le statut est valide
            const statusEnum = Object.values(enum_cte_1.InvoiceTransactionStatus).includes(statusInvoice);
            if (!statusEnum)
                return response.json({ status: 400, message: "Le statut de la facture est invalide" });
            this.billingService.updateStatusInvoice(storeId, invoiceId, statusInvoice)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.updateDetailsInvoiceNotPaid = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant du magasin n'est pas défini" });
            const invoiceId = request.query.invoice ? parseInt(request.query.invoice, 10) : 0;
            if (!invoiceId)
                return response.json({ status: 400, message: "L'identifiant de la facture n'est pas défini" });
            const saleItems = request.body.saleItems ? request.body.saleItems : [];
            this.billingService.updateDetailsInvoiceNotPaid(storeId, invoiceId, saleItems)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.billingService = billingService;
    }
}
exports.default = new BillingControler(new billingService_1.default(new validationError_saleItem_1.default()));
