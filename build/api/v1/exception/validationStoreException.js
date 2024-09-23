"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationStoreException = void 0;
const AppException_1 = require("./AppException");
class ValidationStoreException extends AppException_1.AppException {
    constructor(errors, message, reason, field) {
        super(message, ValidationStoreException.statusCode, ValidationStoreException.errorCode, reason);
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
exports.ValidationStoreException = ValidationStoreException;
ValidationStoreException.statusCode = 400;
ValidationStoreException.errorCode = 'STOR_ERR_00';
