"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const saleControler_1 = __importDefault(require("../controler/saleControler"));
const AuthJwtMiddleware_1 = __importDefault(require("../middleware/AuthJwtMiddleware"));
class SaleRouter {
    constructor() {
        this.router = express_1.default.Router();
    }
    getInstanceRouter() {
        this.router.use(AuthJwtMiddleware_1.default.authorizeRequest)
            .post('/add/:storeId', saleControler_1.default.createSale)
            .get('/day/:storeId', saleControler_1.default.getDataSaleStoreThisDay)
            .get('/:storeId', saleControler_1.default.getDataSaleByStore);
        return this.router;
    }
    getRouters() { }
}
exports.default = new SaleRouter();
