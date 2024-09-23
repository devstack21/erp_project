import { ArticleDto } from "../../dto/article.dto"
import { filteredFieldArticle } from "../../domain/type.domain.filtered"
import { ResponseHttp } from "../../domain/http.domain"
import { ResponseHttpValidationArticleException } from "../../domain/http.domain"

export interface ControlArticleServiceI {
    
    createArticle : (data : ArticleDto , token : any) => Promise<ResponseHttp | ResponseHttpValidationArticleException>
    getArticle : (storeId : number, articleId? : number, nameArticle? : string) => Promise<ResponseHttp | ResponseHttpValidationArticleException>
    updateArticle : (storeId : number , articleId : number , filteredField : filteredFieldArticle) => Promise<{
        status: number;
        message: string;
    } | {
        status: number;
        message: string;
        id: number;
    }> 
    deleteArticle : (storeId : number , articleId : number ) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>
}