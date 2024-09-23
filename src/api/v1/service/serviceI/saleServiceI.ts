import { SaleItemDto } from "../../dto/saleItem.dto"
import { ResponseHttp } from "../../domain/http.domain"
import { ResponseHttpValidationSaleException } from "../../domain/http.domain"
export interface SaleServiceI {

    createSale : (saleLines : SaleItemDto[] , storeId : number) => Promise<ResponseHttp | ResponseHttpValidationSaleException> ,
    getSaleStoreThisDay : (storeId : number , saleId?: number) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>;
    getSaleByStore : (storeId : number , saleId?: number) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>
}