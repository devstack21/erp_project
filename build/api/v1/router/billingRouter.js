"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const billingControler_1 = __importDefault(require("../controler/billingControler"));
const AuthJwtMiddleware_1 = __importDefault(require("../middleware/AuthJwtMiddleware"));
class BillingRouter {
    constructor() {
        this.router = express_1.default.Router();
    }
    getInstanceRouter() {
        this.router.use(AuthJwtMiddleware_1.default.authorizeRequest)
            .get('/day/:storeId', billingControler_1.default.getInvoiceByStoreThisDay)
            .get('/:storeId', billingControler_1.default.getInvoiceByStore)
            .get('/status/:storeId', billingControler_1.default.getInvoiceByStatus)
            .put('/update/status/:storeId', billingControler_1.default.updateStatusInvoice)
            .put('/update/details/:storeId', billingControler_1.default.updateDetailsInvoiceNotPaid);
        return this.router;
    }
    getRouters() { }
}
exports.default = new BillingRouter();
