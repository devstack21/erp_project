"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSupplierException = void 0;
const AppException_1 = require("./AppException");
class ValidationSupplierException extends AppException_1.AppException {
    constructor(errors, message, reason, field) {
        super(message, ValidationSupplierException.statusCode, ValidationSupplierException.errorCode, reason);
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
exports.ValidationSupplierException = ValidationSupplierException;
ValidationSupplierException.statusCode = 400;
ValidationSupplierException.errorCode = 'SUPP_ERR_00';
