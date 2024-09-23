"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppException_1 = require("../exception/AppException");
class ExceptionHandler {
    static handleError(error) {
        console.error('ERROR LOG :: ', error);
        if (error instanceof AppException_1.AppException) {
            return error.getMessageException();
        }
        return {
            status: 500,
            message: 'Une erreur interne du serveur est survenue',
        };
    }
}
exports.default = ExceptionHandler;
