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
Object.defineProperty(exports, "__esModule", { value: true });
const article_dto_1 = require("../dto/article.dto");
const supplier_dto_1 = require("../dto/supplier.dto");
const unitMeasureDto_1 = require("../dto/unitMeasureDto");
const typeArticle_dto_1 = require("../dto/typeArticle.dto");
const supplierRepository_1 = require("../repository/supplierRepository");
const domainException_1 = require("../exception/domainException");
const unitMeasureRepository_1 = require("../repository/unitMeasureRepository");
const typeArticleRepository_1 = require("../repository/typeArticleRepository");
class ArticleMapper {
    toDto(article) {
        return __awaiter(this, void 0, void 0, function* () {
            const articleDto = new article_dto_1.ArticleDto();
            articleDto.id = article.id;
            articleDto.name = article.name;
            articleDto.code = article.code;
            articleDto.purchase_price = article.purchase_price;
            articleDto.selling_price = article.selling_price;
            articleDto.quantity = article.quantity;
            articleDto.data_supplier = yield this.getDataSupplier(article.supplier);
            articleDto.data_unitMeasure = yield this.getDataUnitMeasure(article.unitMeasure);
            articleDto.data_typeArticle = yield this.getDataTypeArticle(article.typeArticle);
            return articleDto;
        });
    }
    toDtoArray(articles) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(articles.map(article => this.toDto(article)));
        });
    }
    getDataSupplier(supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier_object = yield supplierRepository_1.SupplierRepository.findOne({ where: { id: supplier.id } });
            if (!supplier_object)
                throw new domainException_1.DomainError("Le fournisseur n'existe pas", 400, "Supplier", "ID supplier not found");
            const supplierDto = new supplier_dto_1.SupplierDto();
            supplierDto.name = supplier.name;
            supplierDto.phone = supplier.phone;
            return supplierDto;
        });
    }
    getDataUnitMeasure(unitMeasure) {
        return __awaiter(this, void 0, void 0, function* () {
            const um_object = yield unitMeasureRepository_1.UnitMeasureRepository.findOne({ where: { libelle: unitMeasure.libelle } });
            if (!um_object)
                throw new domainException_1.DomainError("L'unité de mesure n'existe pas", 400, "Unit Measure", "ID unit measure not found");
            const unitMeasureDto = new unitMeasureDto_1.UnitMeasurerDto();
            unitMeasureDto.libelle = unitMeasure.libelle;
            unitMeasureDto.code = unitMeasure.code;
            return unitMeasureDto;
        });
    }
    getDataTypeArticle(typeArticle) {
        return __awaiter(this, void 0, void 0, function* () {
            const ta_object = yield typeArticleRepository_1.TypeArticleRepository.findOne({ where: { libelle: typeArticle.libelle } });
            if (!ta_object)
                throw new domainException_1.DomainError("Le type d'article n'existe pas", 400, "Type article", "ID Type Article not found");
            const typeArticleDto = new typeArticle_dto_1.TypeArticleDto();
            typeArticleDto.libelle = typeArticle.libelle;
            typeArticleDto.description = typeArticle.description;
            return typeArticleDto;
        });
    }
}
exports.default = new ArticleMapper();
