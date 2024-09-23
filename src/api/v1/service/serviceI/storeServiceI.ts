import { StoreDto } from "../../dto/store.dto"
import { ResponseHttp } from "../../domain/http.domain"
import { ResponseHttpValidationStoreException } from "../../domain/http.domain"

export interface StoreServiceI {
    
    addStore : (data : StoreDto, token : any) => Promise<ResponseHttp | ResponseHttpValidationStoreException>
    getStore : (token : any) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>
    updateStore : (idStore : number , fieldUpdated : any) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>
    deleteStore : (idStore : number) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>
}