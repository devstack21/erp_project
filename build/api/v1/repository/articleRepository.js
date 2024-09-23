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
exports.ArticleRepository = void 0;
const article_models_1 = require("../db/models/article.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const storeRepository_1 = require("./storeRepository");
const typeArticleRepository_1 = require("./typeArticleRepository");
const unitMeasureRepository_1 = require("./unitMeasureRepository");
const supplierRepository_1 = require("./supplierRepository");
const AppException_1 = require("../exception/AppException");
const article_mapper_1 = __importDefault(require("../mapper/article.mapper"));
exports.ArticleRepository = ormconfig_1.default.getRepository(article_models_1.Article).extend({
    createArticle(transactionalEntity, data, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let articleExist = yield transactionalEntity.withRepository(this).findByName(storeId, data.name);
                if (articleExist)
                    throw new domainException_1.DomainError('Le nom associé a cet article dans cette boutique existe déja', 400, 'Article', 'name article exist already');
                const store = yield transactionalEntity.withRepository(storeRepository_1.StoreRepository).findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                const typeArticle = yield transactionalEntity.withRepository(typeArticleRepository_1.TypeArticleRepository).findOne({ where: { libelle: data.typeArticle } });
                if (!typeArticle)
                    throw new domainException_1.DomainError("Le type de cet article n'existe pas", 400, 'Type Article', 'type article not found');
                const unitMeasure = yield transactionalEntity.withRepository(unitMeasureRepository_1.UnitMeasureRepository).findOne({ where: { libelle: data.unitMeasure } });
                if (!unitMeasure)
                    throw new domainException_1.DomainError("L'unité de mesure n'existe pas", 400, 'unitMeasure', 'unit measure not found');
                const supplier = yield transactionalEntity.withRepository(supplierRepository_1.SupplierRepository).findOne({ where: { name: data.supplier } });
                if (!supplier)
                    throw new domainException_1.DomainError("Ce fournisseur n'existe pas", 400, 'Supplier', 'supplier not found');
                //create new article    
                const newArticle = new article_models_1.Article();
                newArticle.name = data.name;
                newArticle.code = data.code;
                newArticle.selling_price = data.selling_price;
                newArticle.purchase_price = data.purchase_price;
                newArticle.quantity = data.quantity;
                newArticle.store = store;
                newArticle.typeArticle = typeArticle;
                newArticle.unitMeasure = unitMeasure;
                newArticle.supplier = supplier;
                const articleSaved = yield transactionalEntity.withRepository(this).save(newArticle)
                    .catch((error) => {
                    console.error(error);
                    throw new AppException_1.AppException("Echec de création de l'article", 400, "APP_ERR_00", error.reason);
                });
                transactionalEntity.withRepository(storeRepository_1.StoreRepository).addArticleStore(articleSaved, store);
                return articleSaved;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    },
    updateArticle(transactionalEntity, storeId, articleId, filteredField) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield transactionalEntity.withRepository(storeRepository_1.StoreRepository).findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                const article = yield transactionalEntity.withRepository(this).findOneByArticleIdStore(articleId, storeId);
                if (!article)
                    throw new domainException_1.DomainError("L'article n'existe pas dans ce magasin", 400, 'Article', 'article not associated with this store');
                if (filteredField.name)
                    article.name = filteredField.name;
                if (filteredField.code)
                    article.code = filteredField.code;
                if (filteredField.selling_price)
                    article.selling_price = filteredField.selling_price;
                if (filteredField.purchase_price)
                    article.purchase_price = filteredField.purchase_price;
                if (filteredField.quantity)
                    article.quantity = filteredField.quantity;
                if (filteredField.typeArticle) {
                    const typeArticle = yield transactionalEntity.withRepository(typeArticleRepository_1.TypeArticleRepository).findOne({ where: { libelle: filteredField.typeArticle } });
                    if (typeArticle)
                        article.typeArticle = typeArticle;
                    else
                        throw new domainException_1.DomainError("Type d'article inconnu", 400, 'TypeArticle', 'Type article not found');
                }
                if (filteredField.unitMeasure) {
                    const unitMeasure = yield transactionalEntity.withRepository(unitMeasureRepository_1.UnitMeasureRepository).findOne({ where: { libelle: filteredField.unitMeasure } });
                    if (unitMeasure)
                        article.unitMeasure = unitMeasure;
                    else
                        throw new domainException_1.DomainError("Unité de mesure inconnu", 400, 'Unit Measure', 'Unit Measure not found');
                }
                if (filteredField.supplier) {
                    const supplier = yield transactionalEntity.withRepository(supplierRepository_1.SupplierRepository).findOne({ where: { name: filteredField.supplier } });
                    if (supplier)
                        article.supplier = supplier;
                    else
                        throw new domainException_1.DomainError("Fournisseur inconnu", 400, 'Supplier', 'Supplier not found');
                }
                return yield transactionalEntity.withRepository(this).save(article).catch((error) => {
                    throw new AppException_1.AppException("Échec de mise à jour de l'article", 400, "APP_ERR_01", error.reason);
                });
            }
            catch (error) {
                throw error;
            }
        });
    },
    deleteArticle(storeId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("Le store n'existe pas", 404, 'Store', 'store not found');
                const article = yield exports.ArticleRepository.findOneByArticleIdStore(articleId, storeId);
                if (!article)
                    throw new domainException_1.DomainError("L'article n'existe pas dans ce magasin", 400, 'Article', 'ID article not found');
                yield this.remove(article).catch((error) => {
                    throw new AppException_1.AppException("Échec de suppression de l'article", 400, "APP_ERR_01", error.reason);
                });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    },
    getArticle(storeId, articleId, nameArticle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("L'identifiant de la boutique n'existe pas", 400, 'Store', 'ID store not found');
                if (articleId) {
                    const article = yield exports.ArticleRepository.findOneByArticleIdStore(articleId, storeId);
                    if (!article)
                        throw new domainException_1.DomainError("L'article n'existe pas dans ce magasin", 400, 'Article', 'ID article not found');
                    return Promise.all([article_mapper_1.default.toDto(article)]);
                }
                if (nameArticle) {
                    const article = yield exports.ArticleRepository.findOneByNameArticleStore(nameArticle, storeId);
                    if (!article)
                        throw new domainException_1.DomainError("L'article n'existe pas dans ce magasin", 400, 'Article', 'ID article not found');
                    return Promise.all([article_mapper_1.default.toDto(article)]);
                }
                const articles = yield exports.ArticleRepository.findByStoreId(storeId);
                return article_mapper_1.default.toDtoArray(articles);
            }
            catch (error) {
                throw error;
            }
        });
    },
    findByArticleIds(articleIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (articleIds.length === 0) {
                return []; // Retourne un tableau vide si aucun ID n'est fourni
            }
            try {
                const articles = yield this.createQueryBuilder('article')
                    .where('article.id IN (:...articleIds)', { articleIds })
                    .getMany();
                return articles;
            }
            catch (error) {
                throw new domainException_1.DomainError("Une erreur de récupération des articles", 404, 'Article', 'Articles get error');
            }
        });
    },
    findOneByArticleIdStore(articleId, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.findOne({ where: { id: articleId, store: { id: storeId } },
                relations: ['unitMeasure', 'typeArticle', 'supplier'] });
            return article ? article : undefined;
        });
    },
    findByStoreId(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.find({ where: { store: { id: storeId } },
                relations: ['unitMeasure', 'typeArticle', 'supplier'] });
            return article ? article : [];
        });
    },
    findByArticleId(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.findOne({ where: { id: articleId },
                relations: ['unitMeasure', 'typeArticle', 'supplier'] });
            return article ? article : undefined;
        });
    },
    findOneByNameArticleStore(nameArticle, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.findOne({ where: { name: nameArticle, store: { id: storeId } },
                relations: ['unitMeasure', 'typeArticle', 'supplier'] });
            return article ? article : undefined;
        });
    },
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.findOne({ where: { code: code } });
            return article ? article : undefined;
        });
    },
    findByStore(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ where: { store: { id: storeId } } });
        });
    },
    findByTypeArticle(typeArticleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ where: { typeArticle: { id: typeArticleId } } });
        });
    },
    findByUnitMeasure(unitMeasureId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ where: { unitMeasure: { id: unitMeasureId } } });
        });
    },
    findBySupplier(supplierId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ where: { supplier: { id: supplierId } } });
        });
    },
    findByName(storeId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.findOne({ where: { name: name, store: { id: storeId } } });
            return article ? article : undefined;
        });
    }
});
