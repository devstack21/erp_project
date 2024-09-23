import { TypeArticle } from '../db/models/type.article.models';
import dbInstance from '../db/ormconfig';
import { DomainError } from '../exception/domainException';
import typeArticleMapper from '../mapper/typeArticle.mapper';
export const TypeArticleRepository = dbInstance.getRepository(TypeArticle).extend({
    async findByLibelle(libelle: string): Promise<TypeArticle | undefined> {
        const typeArticle = await this.findOne({ where: { libelle : libelle } });
        return typeArticle ? typeArticle : undefined
    },
    async findByDescription(description: string): Promise<TypeArticle | undefined> {
        const typeArticle = await this.findOne({ where: { description : description } });
        return typeArticle ? typeArticle : undefined
    },
    async getListTypeArticle(typeArticleId : number){
        try {
            let query = this.createQueryBuilder('typeArticle') 
            if(typeArticleId){
                const typeArticle = await this.findOne({where : {id : typeArticleId}})
                if(!typeArticle) throw new DomainError("Le type d'article spécifié n'existe pas", 400, 'Type Article', 'ID TypeArticle not found');
                query = query.andWhere('typeArticle.id = :typeArticleId', {typeArticleId})
            }  
            const typeArticles = await query.getMany()
            return typeArticleMapper.toDtoArray(typeArticles)     
        } catch (error) {
            throw error
        }
    }
});
