import { MessageValidationArticleError, MessageValidationError, MessageValidationSaleItemError, MessageValidationStoreError } from "./error.domain"
export interface ResponseHttp {

    message?: string | any, 
    status : number , 
    response_data ?: any[] | any,
    token?:string,
    id?:number,
    reason?:string | unknown,
    
  }

export interface ResponseHttpValidationException extends ResponseHttp {
  errors?: MessageValidationError
}

export interface ResponseHttpValidationStoreException extends ResponseHttp {

  errors? : MessageValidationStoreError
}

export interface ResponseHttpValidationArticleException extends ResponseHttp {
  errors? : MessageValidationArticleError
}
export interface ResponseHttpValidationSaleException{
  errors? : MessageValidationSaleItemError
}
