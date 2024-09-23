import { TypeArticle } from "../db/models/type.article.models"
import { TypeArticleDto } from "../dto/typeArticle.dto"
import { MapperI } from "./mapperI/mapperI"
class TypeArticleMapper implements MapperI {

    async toDto(typeArticle : TypeArticle){
        const typeArticleDto = new TypeArticleDto()
        typeArticleDto.id = typeArticle.id
        typeArticleDto.libelle = typeArticle.libelle
        typeArticleDto.description = typeArticle.description
        return typeArticleDto
    }
    async toDtoArray(typeArticles : TypeArticle[]) : Promise<TypeArticleDto[]>{
        return Promise.all(typeArticles.map(typeArticle => this.toDto(typeArticle)));
    }
}

export default new TypeArticleMapper()