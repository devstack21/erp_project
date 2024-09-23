import { Response, Request  } from "express"
import ControlArticleService from "../service/controlArticleService"
import ValidationErrorArticle from "../utils/validationError.article"
import { plainToClass } from "class-transformer"
import { ArticleDto } from "../dto/article.dto"
import { filteredFieldArticle } from "../domain/type.domain.filtered"
import { ControlArticleControlerI } from "./controlerI/controlArticleControlerI"

class ControlArticleControler implements ControlArticleControlerI {

    private readonly controlArticleServie : ControlArticleService
    constructor(controlArticleService : ControlArticleService){
        this.controlArticleServie = controlArticleService
    }
    createArticle = (request : Request , response : Response) => {
        
        const storeId : number = parseInt(request.params.storeId , 10) 
        if (!storeId) return response.json({status : 400 , message : "L'identifiant de la boutique n'est pas defini"})
        const articleDto = plainToClass(ArticleDto, request.body)
        this.controlArticleServie.createArticle(articleDto, storeId)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})

    }
    getArticle = (request : Request , response : Response) => {
        const storeId = parseInt(request.params.storeId  , 10)
        if(!storeId) return response.json({status : 400 , message : "L'identifiant de la boutique n'est pas defini"})
        const articleId = request.query.article ? parseInt(request.query.article as string, 10) : 0
        const nameArticle = request.query.name ? request.query.name as string : undefined
        this.controlArticleServie.getArticle(storeId, articleId, nameArticle)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})  
    } 
    updateArticle = (request : Request, response : Response) => {
        const storeId = parseInt(request.params.storeId  , 10)
        if(!storeId) return response.json({status : 400 , message : "L'identifiant de la boutique n'est pas defini"})
        const articleId =  parseInt(request.query.article as string, 10)
        if(!articleId) return response.json({status : 400 , message : "L'identifiant de l'article n'est pas defini"})
        const filteredField : filteredFieldArticle = {
            name : request.query.name as string | undefined,
            code: request.query.code as string | undefined,
            selling_price : request.query.selling_price as number | undefined,
            purchase_price : request.query.purchase_price as number | undefined,
            quantity : request.query.quantity as number | undefined,
            typeArticle: request.query.typeArticle as string | undefined,
            unitMeasure: request.query.unitMeasure as string | undefined,
            supplier: request.query.supplier as string | undefined
        }
        this.controlArticleServie.updateArticle(storeId, articleId ,filteredField)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    deleteArticle = (request : Request, response : Response) => {
        const storeId = parseInt(request.params.storeId  , 10)
        if(!storeId) return response.json({status : 400 , message : "L'identifiant de la boutique n'est pas defini"})
        const articleId =  parseInt(request.query.article as string, 10)
        
        if(!articleId) return response.json({status : 400 , message : "L'identifiant de l'article n'est pas defini"})
        
        this.controlArticleServie.deleteArticle(storeId, articleId)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})  
    }

}

export default new ControlArticleControler(
    new ControlArticleService(
        new ValidationErrorArticle()
    )
)
    
    