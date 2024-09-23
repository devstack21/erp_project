"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outStockException_1 = require("../exception/outStockException");
const insufficientStockException_1 = require("../exception/insufficientStockException");
class HandlerStockUtils {
    getCheckingTransactionStock(article, initial_stock, saleItem_quantity) {
        const messageStockError = {
            initial_stock,
            article
        };
        if (initial_stock === 0) {
            throw new outStockException_1.OutStockException(messageStockError, `Rupture de stock de l'article ${article}`, 'Initial stock 0');
        }
        if (initial_stock - saleItem_quantity < 0) {
            messageStockError.status_stock = true;
            throw new insufficientStockException_1.InsufficientStockException(messageStockError, `Stock insuffisant de l'article ${article}`, `not enough stock`);
        }
        return initial_stock - saleItem_quantity;
    }
}
exports.default = new HandlerStockUtils();
