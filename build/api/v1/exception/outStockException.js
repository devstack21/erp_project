"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutStockException = void 0;
const AppException_1 = require("./AppException");
class OutStockException extends AppException_1.AppException {
    constructor(errors, message, reason) {
        super(message, OutStockException.statusCode, OutStockException.errorCode, reason);
        this.errors = errors;
    }
    getMessageException() {
        const messageException = super.getMessageException();
        messageException['errors'] = this.errors;
        return messageException;
    }
    ;
}
exports.OutStockException = OutStockException;
OutStockException.statusCode = 400;
OutStockException.errorCode = 'OOS_ERR_00';
