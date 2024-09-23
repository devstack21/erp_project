"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControler_1 = __importDefault(require("../controler/authControler"));
const AuthJwtMiddleware_1 = __importDefault(require("../middleware/AuthJwtMiddleware"));
class AuthRouter {
    constructor() {
        this.router = express_1.default.Router();
    }
    getInstanceRouter() {
        this.router
            .post('/signup', authControler_1.default.signup)
            .post('/login', authControler_1.default.login)
            .post('/logout', AuthJwtMiddleware_1.default.authorizeRequest, authControler_1.default.logout);
        return this.router;
    }
    getRouters() { }
}
exports.default = new AuthRouter();
