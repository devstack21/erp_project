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
exports.ArticleDto = void 0;
const class_validator_1 = require("class-validator");
const name_constraint_1 = require("../constraint/article.constraint/name.constraint");
const code_constraints_1 = require("../constraint/article.constraint/code.constraints");
const class_validator_2 = require("class-validator");
class ArticleDto {
}
exports.ArticleDto = ArticleDto;
__decorate([
    (0, class_validator_2.Validate)(name_constraint_1.NameArticleUniqueValidate, {
        message: 'Article name exists already'
    }),
    (0, class_validator_1.IsString)({ message: "Article name must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Article name must not be empty" }),
    (0, class_validator_1.Matches)(/^[\p{L}\p{M}0-9 _'\-]+$/u, {
        message: 'Article name can only contain letters, numbers, underscores, dashes, spaces, and apostrophes'
    }),
    __metadata("design:type", String)
], ArticleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_2.Validate)(code_constraints_1.CodeArticleUniqueValidate, {
        message: 'Article code exists already'
    }),
    (0, class_validator_1.IsString)({ message: "Article code must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Article code must not be empty" }),
    (0, class_validator_1.Matches)(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'Article code can only contain letters, numbers, underscores, dashes, and spaces'
    }),
    __metadata("design:type", String)
], ArticleDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsPositive)({ message: "Quantity must be positive" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Quantity emust not be empty" }),
    __metadata("design:type", Number)
], ArticleDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsPositive)({ message: "selling price must be positive" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Selling princemust not be empty" }),
    __metadata("design:type", Number)
], ArticleDto.prototype, "selling_price", void 0);
__decorate([
    (0, class_validator_1.IsPositive)({ message: "selling price must be positive" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Selling princemust not be empty" }),
    __metadata("design:type", Number)
], ArticleDto.prototype, "purchase_price", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Article code must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Article code must not be empty" }),
    (0, class_validator_1.Matches)(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'Article type can only contain letters, numbers, underscores, dashes, and spaces'
    }),
    __metadata("design:type", String)
], ArticleDto.prototype, "typeArticle", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Unit measure must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Unit measure must not be empty" }),
    (0, class_validator_1.Matches)(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'Unit measure can only contain letters, numbers, underscores, dashes, and spaces'
    }),
    __metadata("design:type", String)
], ArticleDto.prototype, "unitMeasure", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "name must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Unit measure must not be empty" }),
    (0, class_validator_1.Matches)(/^[\p{L}\p{M}0-9 _'.\-]+$/u, {
        message: 'Supplier can only contain letters, numbers, underscores, dashes, spaces, apostrophes, and periods'
    }),
    __metadata("design:type", String)
], ArticleDto.prototype, "supplier", void 0);
