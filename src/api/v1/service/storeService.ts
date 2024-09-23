import { StoreServiceI } from "./serviceI/storeServiceI";
import { StoreDto } from "../dto/store.dto";
import { StoreRepository } from "../repository/storeRepository";
import { ResponseHttp, ResponseHttpValidationStoreException } from "../domain/http.domain";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import ValidationErrorStore from "../utils/validationError.store";
import { ValidationStoreException } from "../exception/validationStoreException";
import ExceptionHandler from "../handlerException/handlerException";
import dbInstance from "../db/ormconfig";
import JwtService from "./jwtService";
import { filteredFieldStore } from "../domain/type.domain.filtered";

export default class StoreService implements StoreServiceI{
    private readonly storeRepository =  StoreRepository
    private readonly jwtService : JwtService
    private readonly validationErrorStore : ValidationErrorStore
    constructor(validationErrorStore : ValidationErrorStore, jwtService : JwtService){
        this.validationErrorStore = validationErrorStore
        this.jwtService = jwtService
    }
    async addStore(data : StoreDto, token : any) : Promise<ResponseHttp | ResponseHttpValidationStoreException>{
        try {
            const createStoreDto = plainToClass(StoreDto , data)
            const errors = await validate(createStoreDto)
            
            if (errors.length > 0) {
                const errorsValidation = this.validationErrorStore.responseValidateError(errors);
               throw new ValidationStoreException(errorsValidation, "Erreur de validation lors de l'ajout d'une boutique",'Validation add store error');
            } 
            const store = await dbInstance.transaction( async (manager) =>{
                const transactionalStoreRepository = manager.withRepository(StoreRepository);
                const userCurrent = await this.jwtService.getUserJwtTokenDecrypt(token) 
                return await transactionalStoreRepository.addStore(manager , data, userCurrent);
          })  
            return {
                status: 201,
                message: 'La boutique a été créee avec succès',
                id: store.id
            } as ResponseHttp;

        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async getStore(token : any){
        try {
            const owner = await this.jwtService.getUserJwtTokenDecrypt(token)
            const stores = await this.storeRepository.getStore(owner)
            return {
                status : 200 , 
                response_data : stores
            } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async updateStore(storeId: number , fieldUpdated : filteredFieldStore ) : Promise<ResponseHttp | ResponseHttpValidationStoreException> {
        try {
           
            const storeUpdated = await dbInstance.transaction(async (manager) =>{
                const transactionStoreRepository = manager.withRepository(StoreRepository);
                return await transactionStoreRepository.updateStore(manager, storeId , fieldUpdated)
             })
             return {
                status : 200,
                message : "La boutique a été mise à jour avec succès",
                id : storeUpdated.id
             } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async deleteStore(storeId: number) {
        try {
            await this.storeRepository.deleteStore(storeId)
            return {
                status : 204,
                message : "Suppression de la boutique réussie avec succès"
            } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
}