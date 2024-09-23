"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSaleException = void 0;
const AppException_1 = require("./AppException");
class ValidationSaleException extends AppException_1.AppException {
    constructor(errors, message, reason, field) {
        super(message, ValidationSaleException.statusCode, ValidationSaleException.errorCode, reason);
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
exports.ValidationSaleException = ValidationSaleException;
ValidationSaleException.statusCode = 400;
ValidationSaleException.errorCode = 'SALE_ERR_00';
