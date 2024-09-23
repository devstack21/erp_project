"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controlArticleService_1 = __importDefault(require("../service/controlArticleService"));
const validationError_article_1 = __importDefault(require("../utils/validationError.article"));
const class_transformer_1 = require("class-transformer");
const article_dto_1 = require("../dto/article.dto");
class ControlArticleControler {
    constructor(controlArticleService) {
        this.createArticle = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant de la boutique n'est pas defini" });
            const articleDto = (0, class_transformer_1.plainToClass)(article_dto_1.ArticleDto, request.body);
            this.controlArticleServie.createArticle(articleDto, storeId)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getArticle = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant de la boutique n'est pas defini" });
            const articleId = request.query.article ? parseInt(request.query.article, 10) : 0;
            const nameArticle = request.query.name ? request.query.name : undefined;
            this.controlArticleServie.getArticle(storeId, articleId, nameArticle)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.updateArticle = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant de la boutique n'est pas defini" });
            const articleId = parseInt(request.query.article, 10);
            if (!articleId)
                return response.json({ status: 400, message: "L'identifiant de l'article n'est pas defini" });
            const filteredField = {
                name: request.query.name,
                code: request.query.code,
                selling_price: request.query.selling_price,
                purchase_price: request.query.purchase_price,
                quantity: request.query.quantity,
                typeArticle: request.query.typeArticle,
                unitMeasure: request.query.unitMeasure,
                supplier: request.query.supplier
            };
            this.controlArticleServie.updateArticle(storeId, articleId, filteredField)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.deleteArticle = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant de la boutique n'est pas defini" });
            const articleId = parseInt(request.query.article, 10);
            if (!articleId)
                return response.json({ status: 400, message: "L'identifiant de l'article n'est pas defini" });
            this.controlArticleServie.deleteArticle(storeId, articleId)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.controlArticleServie = controlArticleService;
    }
}
exports.default = new ControlArticleControler(new controlArticleService_1.default(new validationError_article_1.default()));
