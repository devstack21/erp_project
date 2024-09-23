"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth401Exception = void 0;
const AppException_1 = require("./AppException");
class Auth401Exception extends AppException_1.AppException {
    constructor(message, reason) {
        //call super constructor
        super(message, Auth401Exception.statusCode, Auth401Exception.errorCode, reason);
    }
}
exports.Auth401Exception = Auth401Exception;
Auth401Exception.statusCode = 401;
Auth401Exception.errorCode = 'AUTH_ERR_00';
