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
exports.TypeArticleRepository = void 0;
const type_article_models_1 = require("../db/models/type.article.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const typeArticle_mapper_1 = __importDefault(require("../mapper/typeArticle.mapper"));
exports.TypeArticleRepository = ormconfig_1.default.getRepository(type_article_models_1.TypeArticle).extend({
    findByLibelle(libelle) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeArticle = yield this.findOne({ where: { libelle: libelle } });
            return typeArticle ? typeArticle : undefined;
        });
    },
    findByDescription(description) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeArticle = yield this.findOne({ where: { description: description } });
            return typeArticle ? typeArticle : undefined;
        });
    },
    getListTypeArticle(typeArticleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = this.createQueryBuilder('typeArticle');
                if (typeArticleId) {
                    const typeArticle = yield this.findOne({ where: { id: typeArticleId } });
                    if (!typeArticle)
                        throw new domainException_1.DomainError("Le type d'article spécifié n'existe pas", 400, 'Type Article', 'ID TypeArticle not found');
                    query = query.andWhere('typeArticle.id = :typeArticleId', { typeArticleId });
                }
                const typeArticles = yield query.getMany();
                return typeArticle_mapper_1.default.toDtoArray(typeArticles);
            }
            catch (error) {
                throw error;
            }
        });
    }
});
