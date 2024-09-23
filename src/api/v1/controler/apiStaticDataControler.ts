import { Request , Response } from "express"
import ApiStaticDataService from "../service/apiStaticDataService"
import { ApiStaticDataControlerI } from "./controlerI/apiStaticDataControlerI"

class ApiStaticDataControler implements ApiStaticDataControlerI {

    private readonly apiStaticDataService : ApiStaticDataService
    constructor(apiStaticDataService : ApiStaticDataService){
        this.apiStaticDataService = apiStaticDataService
    }
    getListCity = (request : Request , response : Response) =>{
        const city : number = request.query.city ? parseInt(request.query.city as string , 10) : 0
        this.apiStaticDataService.getListCity(city)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)}) 
    }
    getListCountry = (request : Request , response : Response) =>{
        const country : number = request.query.country ? parseInt(request.query.country as string , 10) : 0
        this.apiStaticDataService.getListCountry(country)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)}) 
    }
    getListDistrict = (request : Request , response : Response) =>{
        const district : number = request.query.district ? parseInt(request.query.district as string , 10) : 0
        this.apiStaticDataService.getListDistrict(district)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)}) 
    }
    getListTypeArticle = (request : Request , response : Response) =>{
        const typeArticle : number = request.query.type_article ? parseInt(request.query.type_article as string , 10) : 0
        this.apiStaticDataService.getListTypeArticle(typeArticle)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)}) 
    }
    getListTypeStore = (request : Request , response : Response) =>{
        const typeStore : number = request.query.type_store ? parseInt(request.query.type_store as string , 10) : 0
        this.apiStaticDataService.getListTypeStore(typeStore)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)}) 
    }
    getListUnitMeasure = (request : Request , response : Response) =>{
        const unit : number = request.query.unit ? parseInt(request.query.unit as string , 10) : 0
        this.apiStaticDataService.getListUnitMeasure(unit)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
}

export default new ApiStaticDataControler(
    new ApiStaticDataService()
)