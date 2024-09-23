"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = void 0;
class AppException extends Error {
    constructor(message, statusCode, errorCode, reason) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.message = message;
        this.reason = reason;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
    getMessageException() {
        return {
            status: this.statusCode,
            message: this.message,
            errorCode: this.errorCode,
            reason: this.reason
        };
    }
    ;
}
exports.AppException = AppException;
