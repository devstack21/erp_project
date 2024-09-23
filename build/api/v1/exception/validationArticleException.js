"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationArticleException = void 0;
const AppException_1 = require("./AppException");
class ValidationArticleException extends AppException_1.AppException {
    constructor(errors, message, reason, field) {
        super(message, ValidationArticleException.statusCode, ValidationArticleException.errorCode, reason);
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
exports.ValidationArticleException = ValidationArticleException;
ValidationArticleException.statusCode = 400;
ValidationArticleException.errorCode = 'ART_ERR_00';
