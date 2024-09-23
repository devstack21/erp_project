"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
const AppException_1 = require("./AppException");
class DomainError extends AppException_1.AppException {
    constructor(message, statusCode, model, reason) {
        super(message, statusCode, DomainError.errorCode, reason);
        this.model = model;
    }
    getMessageException() {
        const messageException = super.getMessageException();
        messageException['model'] = this.model;
        return messageException;
    }
    ;
}
exports.DomainError = DomainError;
DomainError.errorCode = 'DOM_ERR_00';
