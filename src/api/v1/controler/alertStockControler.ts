import AlertStockService from "../service/alertStockService";
import { Request, Response } from "express";
import { AlertStockControlerI } from "./controlerI/alertStockControlerI";

class AlertStockControler implements AlertStockControlerI{

    private alertStockService : AlertStockService
    constructor(alertStockService : AlertStockService){
        this.alertStockService = alertStockService
    }

    getAlertStore = (request : Request , response : Response) =>{
        const storeId : number = parseInt(request.params.storeId  , 10)
        if(!storeId) return response.json({status : 400 , message : "L'identifiant de la boutique n'est pas defini"})
        
        const alert : number = request.query.alert ? parseInt(request.query.alert as string , 10) : 0
        this.alertStockService.getAlertStore(storeId , alert)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
}

export default new AlertStockControler(
    new AlertStockService()
)
