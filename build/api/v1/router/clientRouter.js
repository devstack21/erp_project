"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_controler_1 = __importDefault(require("../controler/client.controler"));
const AuthJwtMiddleware_1 = __importDefault(require("../middleware/AuthJwtMiddleware"));
class ClientRouter {
    constructor() {
        this.router = express_1.default.Router();
    }
    getInstanceRouter() {
        this.router.use(AuthJwtMiddleware_1.default.authorizeRequest)
            .get('/connected', client_controler_1.default.getClientConnected);
        return this.router;
    }
    getRouters() { }
}
exports.default = new ClientRouter();
