import SupplierService from "../service/supplierService";
import { Request, Response } from "express";
import ValidationErrorSupplier from "../utils/validationError.supplier";
import { plainToClass } from "class-transformer";
import { SupplierDto } from "../dto/supplier.dto";

class SupplierControler {
    private readonly supplierService : SupplierService
    constructor(supplierService : SupplierService){
        this.supplierService = supplierService
    }
    createSupplierStore = (request : Request , response : Response) =>{
        const storeId : number = parseInt(request.params.storeId  , 10)
        if(!storeId) return response.json({status : 400 , message : "L'identifiant de la boutique n'est pas defini"})
        
        const supplierDto = plainToClass(SupplierDto , request.body)
        this.supplierService.createSupplierStore(storeId, supplierDto)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})     
    }
    updateSupplierStore = (request : Request , response : Response) =>{
        const storeId : number = parseInt(request.params.storeId, 10);
        if(!storeId) response.json({status : 400 , message : "l'identifiant de la boutique n'est pas défini"})
         
        const supplierId: number = request.query.supplier ? parseInt(request.query.supplier as string, 10) : 0;
        if (!supplierId) return response.json({ status: 400, message: "L'identifiant du fournisseur n'est pas défini" });
    
        const name = request.query.name as string | undefined
        const phone = request.query.phone as string | undefined
        const fieldUpdated = {
            name : name , 
            phone : phone
        }
        this.supplierService.updateSupplierStore(storeId , supplierId, fieldUpdated)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    getSupplierStore = (request : Request , response : Response) =>{
        const storeId : number = parseInt(request.params.storeId, 10);
        if(!storeId) response.json({status : 400 , message : "l'identifiant de la boutique n'est pas défini"})
        
        const supplier : number = request.query.supplier ? parseInt(request.query.supplier as  string , 10) : 0
        this.supplierService.getSupplierStore(storeId, supplier)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})   
    }
    deleteSupplierStore = (request : Request , response : Response) =>{
        const storeId : number = parseInt(request.params.storeId, 10);
        if(!storeId) response.json({status : 400 , message : "l'identifiant de la boutique n'est pas défini"})
        
        const supplier : number = parseInt(request.query.supplier as string , 10)
        if(!supplier) return response.json({status : 400 , message : "L'identifiant du fournisseur n'est pas defini"})
    
        this.supplierService.deleteSupplierStore(storeId , supplier)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})        
    }
}

export default new SupplierControler(
    new SupplierService(
        new ValidationErrorSupplier()
    )
)