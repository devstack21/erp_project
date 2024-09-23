"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controlArticleControler_1 = __importDefault(require("../controler/controlArticleControler"));
const AuthJwtMiddleware_1 = __importDefault(require("../middleware/AuthJwtMiddleware"));
class ControlArticleRouter {
    constructor() {
        this.router = express_1.default.Router();
    }
    getInstanceRouter() {
        this.router.use(AuthJwtMiddleware_1.default.authorizeRequest)
            .post('/add/:storeId', controlArticleControler_1.default.createArticle)
            .get('/:storeId', controlArticleControler_1.default.getArticle)
            .put('/update/:storeId', controlArticleControler_1.default.updateArticle)
            .delete('/delete/:storeId', controlArticleControler_1.default.deleteArticle);
        return this.router;
    }
    getRouters() { }
}
exports.default = new ControlArticleRouter();
