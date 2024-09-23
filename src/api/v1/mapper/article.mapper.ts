import { Article } from "../db/models/article.models";
import { ArticleDto } from "../dto/article.dto";
import { SupplierDto } from "../dto/supplier.dto";
import { UnitMeasurerDto } from "../dto/unitMeasureDto";
import { TypeArticleDto } from "../dto/typeArticle.dto";
import { MapperI } from "./mapperI/mapperI";
import { SupplierRepository } from "../repository/supplierRepository";
import { Supplier } from "../db/models/supplier.models";
import { DomainError } from "../exception/domainException";
import { UnitMeasure } from "../db/models/unitMeasure.models";
import { TypeArticle } from "../db/models/type.article.models";
import { UnitMeasureRepository } from "../repository/unitMeasureRepository";
import { TypeArticleRepository } from "../repository/typeArticleRepository";


class ArticleMapper implements MapperI{

    async toDto (article: Article) : Promise<ArticleDto> {
        const articleDto = new ArticleDto()
        articleDto.id = article.id
        articleDto.name = article.name
        articleDto.code = article.code
        articleDto.purchase_price = article.purchase_price
        articleDto.selling_price = article.selling_price
        articleDto.quantity = article.quantity
        articleDto.data_supplier = await this.getDataSupplier(article.supplier)
        articleDto.data_unitMeasure =  await this.getDataUnitMeasure(article.unitMeasure)
        articleDto.data_typeArticle = await this.getDataTypeArticle(article.typeArticle)
        return articleDto
    }
    async toDtoArray(articles: Article[]): Promise<ArticleDto[]> {
        return Promise.all(articles.map(article => this.toDto(article)));
    }
    private async getDataSupplier(supplier : Supplier) : Promise<SupplierDto>{
        
        const supplier_object = await SupplierRepository.findOne({where : {id : supplier.id}})
        if(!supplier_object) throw new DomainError("Le fournisseur n'existe pas", 400 ,"Supplier", "ID supplier not found")
        const supplierDto = new SupplierDto()
        supplierDto.name = supplier.name
        supplierDto.phone = supplier.phone
        return supplierDto
    }
    private async getDataUnitMeasure(unitMeasure : UnitMeasure) : Promise<UnitMeasurerDto> {
        const um_object = await UnitMeasureRepository.findOne({where : {libelle : unitMeasure.libelle}})
        if(!um_object) throw new DomainError("L'unité de mesure n'existe pas", 400 ,"Unit Measure", "ID unit measure not found")
        const unitMeasureDto = new UnitMeasurerDto()
        unitMeasureDto.libelle = unitMeasure.libelle
        unitMeasureDto.code = unitMeasure.code
        return unitMeasureDto
    }
    private async getDataTypeArticle(typeArticle : TypeArticle) : Promise<TypeArticleDto> {
        const ta_object = await TypeArticleRepository.findOne({where : {libelle : typeArticle.libelle}})
        if(!ta_object) throw new DomainError("Le type d'article n'existe pas", 400 ,"Type article", "ID Type Article not found")
        const typeArticleDto = new TypeArticleDto()
        typeArticleDto.libelle = typeArticle.libelle
        typeArticleDto.description = typeArticle.description
        return typeArticleDto
    }
}
export default new ArticleMapper()