"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supplierControler_1 = __importDefault(require("../controler/supplierControler"));
const AuthJwtMiddleware_1 = __importDefault(require("../middleware/AuthJwtMiddleware"));
class SupplierRouter {
    constructor() {
        this.router = express_1.default.Router();
    }
    getInstanceRouter() {
        this.router.use(AuthJwtMiddleware_1.default.authorizeRequest)
            .post('/add/:storeId', supplierControler_1.default.createSupplierStore)
            .put('/update/:storeId', supplierControler_1.default.updateSupplierStore)
            .get('/:storeId', supplierControler_1.default.getSupplierStore)
            .delete('/delete/:storeId', supplierControler_1.default.deleteSupplierStore);
        return this.router;
    }
    getRouters() { }
}
exports.default = new SupplierRouter();
