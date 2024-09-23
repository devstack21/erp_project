"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = exports.AppError = void 0;
const AppException_1 = require("./AppException");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.codeError = 'APP_00';
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
class ValidationException extends AppException_1.AppException {
    constructor(errors, message, reason, field) {
        super(message, ValidationException.statusCode, ValidationException.errorCode, reason);
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
exports.ValidationException = ValidationException;
ValidationException.statusCode = 400;
ValidationException.errorCode = 'VAL_ERR_00';
