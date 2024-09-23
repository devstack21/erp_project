"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const typeorm_1 = require("typeorm");
const store_models_1 = require("./store.models");
const type_article_models_1 = require("./type.article.models");
const unitMeasure_models_1 = require("./unitMeasure.models");
const supplier_models_1 = require("./supplier.models");
let Article = class Article {
};
exports.Article = Article;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Article.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Article.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Article.prototype, "selling_price", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Article.prototype, "purchase_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Article.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_models_1.Store, store => store.articles),
    __metadata("design:type", store_models_1.Store)
], Article.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => type_article_models_1.TypeArticle, typeArticle => typeArticle.articles),
    __metadata("design:type", type_article_models_1.TypeArticle)
], Article.prototype, "typeArticle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unitMeasure_models_1.UnitMeasure, unitMeasure => unitMeasure.articles),
    __metadata("design:type", unitMeasure_models_1.UnitMeasure)
], Article.prototype, "unitMeasure", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_models_1.Supplier, supplier => supplier.articles),
    __metadata("design:type", supplier_models_1.Supplier)
], Article.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Article.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Article.prototype, "updatedAt", void 0);
exports.Article = Article = __decorate([
    (0, typeorm_1.Entity)()
], Article);
