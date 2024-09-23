"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertConfig = exports.MethodPayment = exports.InvoiceTransactionStatus = void 0;
var InvoiceTransactionStatus;
(function (InvoiceTransactionStatus) {
    InvoiceTransactionStatus["PAID"] = "Pay\u00E9";
    InvoiceTransactionStatus["CANCELLED"] = "Annul\u00E9";
    InvoiceTransactionStatus["PENDING"] = "En Attente";
    InvoiceTransactionStatus["CREDIT"] = "A cr\u00E9dit";
    InvoiceTransactionStatus["UNPAID"] = "Impay\u00E9";
    InvoiceTransactionStatus["LOST"] = "Perte";
})(InvoiceTransactionStatus || (exports.InvoiceTransactionStatus = InvoiceTransactionStatus = {}));
var MethodPayment;
(function (MethodPayment) {
    MethodPayment["CASH"] = "En esp\u00E8ce";
    MethodPayment["OM"] = "Orange Money";
    MethodPayment["MOMO"] = "Mobile Money";
})(MethodPayment || (exports.MethodPayment = MethodPayment = {}));
var AlertConfig;
(function (AlertConfig) {
    AlertConfig["ACTIVED"] = "Activ\u00E9";
    AlertConfig["DESACTIVED"] = "D\u00E9sactiv\u00E9";
})(AlertConfig || (exports.AlertConfig = AlertConfig = {}));
