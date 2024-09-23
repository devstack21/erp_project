"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientStockException = void 0;
const AppException_1 = require("./AppException");
class InsufficientStockException extends AppException_1.AppException {
    constructor(errors, message, reason) {
        super(message, InsufficientStockException.statusCode, InsufficientStockException.errorCode, reason);
        this.errors = errors;
    }
    getMessageException() {
        const messageException = super.getMessageException();
        messageException['errors'] = this.errors;
        return messageException;
    }
    ;
}
exports.InsufficientStockException = InsufficientStockException;
InsufficientStockException.statusCode = 400;
InsufficientStockException.errorCode = 'ISTOCK_ERR_00';
