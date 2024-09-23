import { ControlArticleServiceI } from "./serviceI/controlArticeServiceI";
import { ArticleDto } from "../dto/article.dto";
import { ArticleRepository } from "../repository/articleRepository";
import ValidationErrorArticle from "../utils/validationError.article";
import { ValidationArticleException } from "../exception/validationArticleException";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import dbInstance from "../db/ormconfig";
import ExceptionHandler from "../handlerException/handlerException";
import { ResponseHttp, ResponseHttpValidationArticleException } from "../domain/http.domain";
import { filteredFieldArticle } from "../domain/type.domain.filtered";

export default class ControlArticleService implements ControlArticleServiceI{
    private readonly articleRepository = ArticleRepository
    private readonly validationErrorArticle : ValidationErrorArticle
    constructor(validationErrorArticle : ValidationErrorArticle){
        this.validationErrorArticle = validationErrorArticle
    }
    async createArticle( data : ArticleDto , storeId : number) : Promise<ResponseHttp |ResponseHttpValidationArticleException>{
        try {
            const createArticleDto = plainToClass(ArticleDto , data)
            const errors = await validate(createArticleDto)
            if (errors.length > 0) {
                const errorsValidation = this.validationErrorArticle.responseValidateError(errors);
               throw new ValidationArticleException(errorsValidation, "Erreur de validation lors de la création d'un article ",'Validation add article');
           } 
           const article = await dbInstance.transaction(async (manager) =>{
                const transactionalArticleRepository = manager.withRepository(ArticleRepository); 
                return await transactionalArticleRepository.createArticle(manager, data , storeId)
           })
           return {
            status : 201,
            message : "L'article a été crée avec succès",
            id : article.id
           } as ResponseHttp
            
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
   async getArticle(storeId : number, articleId? : number, nameArticle?: string){
        try {
            const articles = await this.articleRepository.getArticle(storeId, articleId, nameArticle)
            return {
                status : 200 , 
                response_data : articles
            } as ResponseHttp

        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    } 
    async updateArticle(storeId : number , articleId : number , filteredField : filteredFieldArticle){
        try {
            const articleUpdated = await dbInstance.transaction(async (manager) =>{
                const transactionArticleRepository = manager.withRepository(ArticleRepository);
                return await transactionArticleRepository.updateArticle(manager , storeId ,articleId, filteredField)
             })
             return {
                status : 200,
                message : "L'article a été mit a jour avec succès",
                id : articleUpdated.id
             }
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async deleteArticle(storeId : number , articleId : number ) {
        try {
            await this.articleRepository.deleteArticle(storeId, articleId)
            return {
                status : 204,
                message : "Suppression de l'article' réussie avec succès"
            } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
}