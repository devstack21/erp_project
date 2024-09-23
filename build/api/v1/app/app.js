"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectdb_1 = require("../db/connectdb/connectdb");
const ErrorMiddlewareHttp_1 = __importDefault(require("../middleware/ErrorMiddlewareHttp"));
const authRouter_1 = __importDefault(require("../router/authRouter"));
const storeRouter_1 = __importDefault(require("../router/storeRouter"));
const controlArticleRouter_1 = __importDefault(require("../router/controlArticleRouter"));
const saleRouter_1 = __importDefault(require("../router/saleRouter"));
const billingRouter_1 = __importDefault(require("../router/billingRouter"));
const alertRouter_1 = __importDefault(require("../router/alertRouter"));
const supplierRouter_1 = __importDefault(require("../router/supplierRouter"));
const apiStaticDataRouter_1 = __importDefault(require("../router/apiStaticDataRouter"));
const clientRouter_1 = __importDefault(require("../router/clientRouter"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeDatabase();
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, express_session_1.default)({
            secret: process.env.SECRET_SESSION,
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }
        }));
        this.app.use(express_1.default.static('public'));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
    }
    initializeRoutes() {
        this.app.use('/ws/auth/v1', authRouter_1.default.getInstanceRouter());
        this.app.use('/ws/api/v1/store', storeRouter_1.default.getInstanceRouter());
        this.app.use('/ws/api/v1/article', controlArticleRouter_1.default.getInstanceRouter());
        this.app.use('/ws/api/v1/sale', saleRouter_1.default.getInstanceRouter());
        this.app.use('/ws/api/v1/invoice', billingRouter_1.default.getInstanceRouter());
        this.app.use('/ws/api/v1/alert', alertRouter_1.default.getInstanceRouter());
        this.app.use('/ws/api/v1/supplier', supplierRouter_1.default.getInstanceRouter());
        this.app.use('/ws/api/v1/data', apiStaticDataRouter_1.default.getInstanceRouter());
        this.app.use('/ws/api/v1/client', clientRouter_1.default.getInstanceRouter());
        this.app.use(ErrorMiddlewareHttp_1.default.NotFoundErrorsHttp);
        this.app.use(ErrorMiddlewareHttp_1.default.GlobalErrorHandlerHttp);
    }
    initializeDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, connectdb_1.connectDatabaseWithRetry)();
                this.runServer();
            }
            catch (err) {
                process.exit(1);
            }
        });
    }
    runServer() {
        const port = process.env.PORT;
        this.app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}
exports.default = new App().app;
