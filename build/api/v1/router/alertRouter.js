"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthJwtMiddleware_1 = __importDefault(require("../middleware/AuthJwtMiddleware"));
const alertStockControler_1 = __importDefault(require("../controler/alertStockControler"));
class AlertRouter {
    constructor() {
        this.router = express_1.default.Router();
    }
    getInstanceRouter() {
        this.router.use(AuthJwtMiddleware_1.default.authorizeRequest)
            .get('/:storeId', alertStockControler_1.default.getAlertStore);
        return this.router;
    }
    getRouters() { }
}
exports.default = new AlertRouter();
