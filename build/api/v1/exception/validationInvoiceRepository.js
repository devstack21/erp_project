"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationInvoiceException = void 0;
const AppException_1 = require("./AppException");
class ValidationInvoiceException extends AppException_1.AppException {
    constructor(errors, message, reason, field) {
        super(message, ValidationInvoiceException.statusCode, ValidationInvoiceException.errorCode, reason);
        this.errors = errors;
        this.field = field;
    }
    getMessageException() {
        const messageException = super.getMessageException();
        messageException['errors'] = this.errors;
        messageException['field'] = this.field;
        return messageException;
    }
    ;
}
exports.ValidationInvoiceException = ValidationInvoiceException;
ValidationInvoiceException.statusCode = 400;
ValidationInvoiceException.errorCode = 'INV_ERR_00';
