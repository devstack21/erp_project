"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtErrorException = void 0;
const AppException_1 = require("./AppException");
class JwtErrorException extends AppException_1.AppException {
    constructor(message, reason) {
        super(message, JwtErrorException.statusCode, JwtErrorException.errorCode, reason);
    }
}
exports.JwtErrorException = JwtErrorException;
JwtErrorException.statusCode = 401;
JwtErrorException.errorCode = 'JWT_ERR_00';
