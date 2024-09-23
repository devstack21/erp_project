import { plainToClass } from "class-transformer";
import { SupplierDto } from "../dto/supplier.dto";
import ExceptionHandler from "../handlerException/handlerException";
import { SupplierRepository } from "../repository/supplierRepository";
import ValidationErrorSupplier from "../utils/validationError.supplier";
import { validate } from "class-validator";
import { ValidationSupplierException } from "../exception/validationSupplierException";
import dbInstance from "../db/ormconfig";
import { ResponseHttp } from "../domain/http.domain";
import { filteredFieldSupplier } from "../domain/type.domain.filtered";

export default class SupplierService {
    private readonly supplierRepository = SupplierRepository
    private readonly validationErrorSupplier : ValidationErrorSupplier
    constructor(validationErrorSupplier : ValidationErrorSupplier){
        this.validationErrorSupplier = validationErrorSupplier
    }
    async createSupplierStore(storeId : number , data : SupplierDto){
        try {
            const createSupplierDto = plainToClass(SupplierDto , data)
            const errors = await validate(createSupplierDto)
            if(errors.length > 0 ){
                const errorsValidation = this.validationErrorSupplier.responseValidateError(errors)
                throw new ValidationSupplierException(errorsValidation, "Erreur de validation lors de l'ajout d'un fournisseur","Validation add supplier error")
            }
            const supplier = await dbInstance.transaction( async (manager) =>{
                const transactionSupplierRepository = manager.withRepository(this.supplierRepository)
                return await transactionSupplierRepository.createSupplierStore(manager, storeId , data)
            })
             return {
                status: 201,
                message: 'Le fournisseur a été crée avec succès',
                id: supplier.id
            } as ResponseHttp;
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async updateSupplierStore(storeId : number, supplierId : number, fieldUpdated : filteredFieldSupplier){
        try {
            const supplierUpdated = await dbInstance.transaction( async (manager) =>{
                const transationRepository = manager.withRepository(SupplierRepository)
                return await transationRepository.updateSupplierStore(manager , storeId , supplierId, fieldUpdated)
            })
            return {
                status: 201,
                message: 'Le fournisseur a été mit à jour avec succès',
                id: supplierUpdated.id
            } as ResponseHttp;
        } catch (error) {
          return ExceptionHandler.handleError(error)  
        }
    }
    async getSupplierStore(storeId : number , supplierId? : number){
        try {
            const suppliers = await this.supplierRepository.getSupplierStore(storeId , supplierId)
            return {
                status : 200 , 
                response_data : suppliers
            } as ResponseHttp

        } catch (error) {
            return ExceptionHandler.handleError(error)
        }

    }
    async deleteSupplierStore(storeId : number , supplierId : number){
        try {
            await this.supplierRepository.deleteSupplierStore(storeId , supplierId)
            return {
                status : 204,
                message : "Suppression du fournisseur réussie avec succès"
            } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
}