import { SaleItemDto } from "../dto/saleItem.dto";
import { SaleRepository } from "../repository/saleRepository";
import ValidationErrorSaleItem from "../utils/validationError.saleItem";
import { SaleServiceI } from "./serviceI/saleServiceI";
import ExceptionHandler from "../handlerException/handlerException";
import dbInstance from "../db/ormconfig";
import { ResponseHttp } from "../domain/http.domain";
import { ResponseHttpValidationSaleException } from "../domain/http.domain";
import { InvoiceRepository } from "../repository/invoiceRepository";

export default class SaleService implements SaleServiceI{
    private readonly saleRepository = SaleRepository
    private readonly invoiceRepository = InvoiceRepository
    private validationErrorSaleItem : ValidationErrorSaleItem
    constructor(validationErrorSaleItem : ValidationErrorSaleItem){
        this.validationErrorSaleItem = validationErrorSaleItem
    }
    async createSale(saleLines : SaleItemDto[] , storeId : number) : Promise<ResponseHttp | ResponseHttpValidationSaleException>{
        try { 
            await this.validationErrorSaleItem.responseValidationSaleItems(saleLines)
            const sale = await dbInstance.transaction(async (manager) =>{
                const transactionalSaleRepository = manager.withRepository(this.saleRepository)
                const transactionalInvoiceRepository = manager.withRepository(this.invoiceRepository)
                const sale = await transactionalSaleRepository.createSale(manager , saleLines , storeId)
                //generate invoice 
                const invoice = await transactionalInvoiceRepository.createInvoice(manager , sale)
                transactionalSaleRepository.registerInvoice(sale , invoice)
                return sale
            })
            return {
                status : 201,
                message :'La vente a été créée avec succès',
                id : sale.id
            } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async getSaleStoreThisDay(storeId : number , saleId?: number){
        try {
           const sales = await this.saleRepository.getSaleStoreThisDay(storeId , saleId)
           return {
            status : 200,
            response_data : sales
           } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async getSaleByStore(storeId : number , saleId?: number){
        try {
           const sales = await this.saleRepository.getSalesByStore(storeId , saleId)
           return {
            status : 200,
            response_data : sales
           } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }

    }
}