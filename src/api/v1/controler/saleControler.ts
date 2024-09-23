import { Request , Response } from "express"
import SaleService from "../service/saleService"
import ValidationErrorSaleItem from "../utils/validationError.saleItem"
import { SaleItemDto } from "../dto/saleItem.dto"
import { SaleControlerI } from "./controlerI/saleControlerI"


class SaleControler implements SaleControlerI{
    
    private readonly saleService : SaleService
    constructor(saleService : SaleService){
        this.saleService = saleService
    }
    createSale = (request : Request , response : Response) =>{
        const storeId : number = parseInt(request.params.storeId  , 10)
        if(!storeId) return response.json({status : 400 , message : "L'identifiant de la boutique n'est pas defini"})
        const saleItems : SaleItemDto[] = request.body.saleItems
        if(saleItems.length == 0) response.json({status : 400 , message : "Envoyez au moins une ligne de vente "})
        this.saleService.createSale(saleItems , storeId)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    getDataSaleStoreThisDay = (request : Request , response : Response) =>{
        const storeId : number = parseInt(request.params.storeId  , 10)
        if(!storeId) return response.json({status : 400 , message : "L'identifiant de la boutique n'est pas defini"})
        const sale : number = request.query.sale ? parseInt(request.query.sale as string , 10) : 0
        this.saleService.getSaleStoreThisDay(storeId , sale)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    
    getDataSaleByStore = (request : Request , response : Response) =>{
        const storeId : number = parseInt(request.params.storeId  , 10)
        if(!storeId) return response.json({status : 400 , message : "L'identifiant de la boutique n'est pas defini"})
        const sale : number = request.query.sale ? parseInt(request.query.sale as string , 10) : 0
        this.saleService.getSaleByStore(storeId , sale)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
}
export default new SaleControler(
    new SaleService(
        new ValidationErrorSaleItem()
    )
)