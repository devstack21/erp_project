"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiStaticDataControler_1 = __importDefault(require("../controler/apiStaticDataControler"));
const AuthJwtMiddleware_1 = __importDefault(require("../middleware/AuthJwtMiddleware"));
class ApiStaticDataRouter {
    constructor() {
        this.router = express_1.default.Router();
    }
    getInstanceRouter() {
        this.router.use(AuthJwtMiddleware_1.default.authorizeRequest)
            .get('/cities', apiStaticDataControler_1.default.getListCity)
            .get('/countries', apiStaticDataControler_1.default.getListCountry)
            .get('/districts', apiStaticDataControler_1.default.getListDistrict)
            .get('/type/articles', apiStaticDataControler_1.default.getListTypeArticle)
            .get('/type/stores', apiStaticDataControler_1.default.getListTypeStore)
            .get('/units', apiStaticDataControler_1.default.getListUnitMeasure);
        return this.router;
    }
    getRouters() { }
}
exports.default = new ApiStaticDataRouter();
