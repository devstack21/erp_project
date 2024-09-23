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
const article_dto_1 = require("../dto/article.dto");
const articleRepository_1 = require("../repository/articleRepository");
const validationArticleException_1 = require("../exception/validationArticleException");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const handlerException_1 = __importDefault(require("../handlerException/handlerException"));
class ControlArticleService {
    constructor(validationErrorArticle) {
        this.articleRepository = articleRepository_1.ArticleRepository;
        this.validationErrorArticle = validationErrorArticle;
    }
    createArticle(data, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createArticleDto = (0, class_transformer_1.plainToClass)(article_dto_1.ArticleDto, data);
                const errors = yield (0, class_validator_1.validate)(createArticleDto);
                if (errors.length > 0) {
                    const errorsValidation = this.validationErrorArticle.responseValidateError(errors);
                    throw new validationArticleException_1.ValidationArticleException(errorsValidation, "Erreur de validation lors de la création d'un article ", 'Validation add article');
                }
                const article = yield ormconfig_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                    const transactionalArticleRepository = manager.withRepository(articleRepository_1.ArticleRepository);
                    return yield transactionalArticleRepository.createArticle(manager, data, storeId);
                }));
                return {
                    status: 201,
                    message: "L'article a été crée avec succès",
                    id: article.id
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getArticle(storeId, articleId, nameArticle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield this.articleRepository.getArticle(storeId, articleId, nameArticle);
                return {
                    status: 200,
                    response_data: articles
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    updateArticle(storeId, articleId, filteredField) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleUpdated = yield ormconfig_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                    const transactionArticleRepository = manager.withRepository(articleRepository_1.ArticleRepository);
                    return yield transactionArticleRepository.updateArticle(manager, storeId, articleId, filteredField);
                }));
                return {
                    status: 200,
                    message: "L'article a été mit a jour avec succès",
                    id: articleUpdated.id
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    deleteArticle(storeId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.articleRepository.deleteArticle(storeId, articleId);
                return {
                    status: 204,
                    message: "Suppression de l'article' réussie avec succès"
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
}
exports.default = ControlArticleService;
