export type AbstractMessageValidationError= {}

export type MessageStockError = {

  initial_stock?:number,
  status_stock? : boolean,
  article?: string
}
export interface MessageValidationError extends AbstractMessageValidationError {
    username?: string , 
    email?: string , 
    phone?: string ,
    districtName?:string,
    pwd?:string,
    fieldErrors? : object
  }
  export interface MessageAppExceptionError {
    status : number , 
    message : string , 
    errorCode : string , 
    reason : string ,
    [key: string]: any;
  }
  export interface MessageValidationStoreError extends AbstractMessageValidationError {
    name? : string
  }
  export interface MessageValidationInvoiceError extends AbstractMessageValidationError{
    totalAmount?: string , 
    status?: string
  }
  export interface MessageValidationSaleItemError extends AbstractMessageValidationError {
    article? : number,
    quantity? : number,
    
  }
  export interface MessageValidationSupplierError extends AbstractMessageValidationError{
    name? : string,
    phone? : string,
  }
  export interface MessageValidationArticleError extends AbstractMessageValidationError{
    name?:string ,
    code?:string,
    selling_price?:number,
    purchase_price?:number,
    quantity?:number,
    typeArticle?:string,
    categoryArticle?:string,
    unitMeasure?:string,
    supplier?:string
  }

