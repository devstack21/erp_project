import { AlertConfig } from "../enum/enum.cte"
export type filteredFieldArticle = {
    name?: string

    code?: string 

    selling_price?:number 

    purchase_price?:number

    quantity?:number

    typeArticle?: string

    unitMeasure?: string

    supplier?: string

}
export type filteredFieldStore = {
    name? : string 
    districtName?:string 
    typeStore?:string
    configAlert?: AlertConfig
}
export type filteredFieldSupplier = {
    name? : string 
    phone? : string
}