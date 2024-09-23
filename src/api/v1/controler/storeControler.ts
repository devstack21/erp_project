import { Request, Response } from "express";
import StoreService from "../service/storeService";
import JwtService from "../service/jwtService";
import ValidationErrorStore from "../utils/validationError.store";
import { StoreDto } from "../dto/store.dto";
import { plainToClass } from "class-transformer";
import { StoreControlerI } from "./controlerI/storeControlerI";
import { AlertConfig } from "../enum/enum.cte";

class StoreControler implements StoreControlerI {

    private readonly storeService : StoreService
    constructor(storeService : StoreService){
        this.storeService = storeService
    }
    addStore = async (request : Request , response : Response) =>{
        const token = request.headers['authorization'] && request.headers['authorization'].split(' ')[1]
        const storeDto = plainToClass(StoreDto, request.body)
        this.storeService.addStore(storeDto , token)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    getStore = async (request : Request , response : Response) =>{
        const token = request.headers['authorization'] && request.headers['authorization'].split(' ')[1]
        this.storeService.getStore(token)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    updateStore = async(request : Request , response : Response) => {
        const storeId : number = parseInt(request.params.storeId, 10);
        if(!storeId) response.json({status : 400 , message : "l'identifiant de la boutique n'est pas défini"})
        
        const name = request.query.name as string | undefined;
        const districtName = request.query.districtName as string | undefined;
        const typeStore = request.query.typeStore as string | undefined;
        const configAlert: string | undefined = request.query.configAlert as string | undefined;
       
        if(configAlert){
            const alertConfigEnum = Object.values(AlertConfig).includes(configAlert as AlertConfig)
            if(!alertConfigEnum) response.json({ status: 400, message: "Cette configuration de cette alerte n'existe pas" });
        }

        const fieldUpdated = {
            name: name ,
            districtName : districtName,
            typeStore : typeStore,
            configAlert : configAlert as AlertConfig
        }
    
        this.storeService.updateStore(storeId , fieldUpdated)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    deleteStore = async (request : Request , response : Response) => {
        const storeId : number = parseInt(request.params.storeId, 10);
        if(!storeId) response.json({status : 400 , message : "l'identifiant de la boutique n'est pas défini"})
        this.storeService.deleteStore(storeId)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }

}
export default new StoreControler(
    new StoreService(
        new ValidationErrorStore(),
        new JwtService()
    )
)