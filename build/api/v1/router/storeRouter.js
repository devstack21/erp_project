"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storeControler_1 = __importDefault(require("../controler/storeControler"));
const AuthJwtMiddleware_1 = __importDefault(require("../middleware/AuthJwtMiddleware"));
class StoreRouter {
    constructor() {
        this.router = express_1.default.Router();
    }
    getInstanceRouter() {
        this.router.use(AuthJwtMiddleware_1.default.authorizeRequest)
            .get('/', storeControler_1.default.getStore)
            .post('/add', storeControler_1.default.addStore)
            .put('/update/:storeId', storeControler_1.default.updateStore)
            .delete('/delete/:storeId', storeControler_1.default.deleteStore);
        return this.router;
    }
    getRouters() { }
}
exports.default = new StoreRouter();
