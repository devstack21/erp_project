"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
class ErrorMiddlewareHttp {
    static NotFoundErrorsHttp(request, response, next) {
        if (!response.headersSent) {
            const error = new Error('URL Not Found');
            error.status = 404;
            next(error);
        }
    }
    static HandlerHTTPNotFoundErrors(request, response, next) {
        const err = (0, http_errors_1.default)(404);
        if (err) {
            console.debug(err);
            response.status(404).json({ message: err, status: 404 });
            next();
        }
    }
    static GlobalErrorHandlerHttp(err, request, response, next) {
        response.status(err.status || 500);
        response.json({
            status: err.status,
            message: err.message,
        });
    }
}
exports.default = ErrorMiddlewareHttp;
