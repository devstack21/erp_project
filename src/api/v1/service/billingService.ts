import dbInstance from "../db/ormconfig";
import ExceptionHandler from "../handlerException/handlerException";
import { InvoiceRepository } from "../repository/invoiceRepository";
import { BillingServiceI } from "./serviceI/billingServiceI";
import { ResponseHttp } from "../domain/http.domain";
import { InvoiceTransactionStatus } from "../enum/enum.cte";
import { SaleRepository } from "../repository/saleRepository";
import { SaleItemDto } from "../dto/saleItem.dto";
import ValidationErrorSaleItem from "../utils/validationError.saleItem";
import { DomainError } from "../exception/domainException";
import { AppException } from "../exception/AppException";

export default class BillingService implements BillingServiceI{
    private readonly invoiceRepository = InvoiceRepository
    private readonly saleRepository = SaleRepository
    private validationErrorSaleItem : ValidationErrorSaleItem
    constructor(validationErrorSaleItem :ValidationErrorSaleItem){
        this.validationErrorSaleItem = validationErrorSaleItem
    }
    async getInvoiceByStoreThisDay(storeId : number ,  invoiceId?: number){
        try {
           const invoices = await this.invoiceRepository.getInvoicesByStoreThisDay(storeId , invoiceId)
           return {
                status : 200,
                response_data : invoices} as ResponseHttp
        }catch (error) {return ExceptionHandler.handleError(error)}
    }
    async updateDetailsInvoiceNotPaid(storeId : number , invoiceId : number , saleLines : SaleItemDto[]){
        try {
            //validate saleLines 
            await this.validationErrorSaleItem.responseValidationSaleItems(saleLines)

            //transaction update invoice
            const invoice = await dbInstance.transaction(async (manager) =>{  
                    const transactionalInvoiceRepository = manager.withRepository(this.invoiceRepository)
                    const transactionalSaleRepository = manager.withRepository(this.saleRepository)
                    //check invoice exist
                    const invoiceExist = await transactionalInvoiceRepository.findOne({where : {id : invoiceId}, relations : ['sale']})
                    if(!invoiceExist) throw new DomainError("La facture spécifiée n'existe pas", 400, 'Invoice', 'ID invoice not found')
                    
                    // check if statut invoice is not paid 
                    if(invoiceExist.status === 'Payé') throw new AppException("Impossible de modifier une facture déja payée", 400, "APP_ERR_01", "status invoice is PAID");
                    if(invoiceExist.status === 'Perte') throw new AppException("Impossible de modifier une facture perdue", 400, "APP_ERR_01", "status invoice is LOST");
                    //update saleLines sale 
                    const saleUpdated = await transactionalSaleRepository.updateSale(manager, storeId ,invoiceExist.sale.id ,saleLines)
                    
                    //update invoice
                    const updatedInvoice = await transactionalInvoiceRepository.updateDetailsInvoice(manager , invoiceId ,saleUpdated.totalAmount) 
                    return updatedInvoice
            }) 
            return {
                message : "La mise a jour de la facture réussie",
                status : 200,
                response_data : invoice
            } as ResponseHttp 
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }   
    }
    async getInvoiceByStore(storeId : number ,  invoiceId?: number){
        try {
            const invoices = await this.invoiceRepository.getInvoicesByStore(storeId , invoiceId)
            return {
                 status : 200,
                 response_data : invoices} as ResponseHttp
         } catch (error) {return ExceptionHandler.handleError(error)}
    }
    async updateStatusInvoice(storeId : number, invoiceId : number, statusInvoice : InvoiceTransactionStatus ){
        try {
            const invoiceStatusUpdated = await dbInstance.transaction(async (manager) =>{
                const transactionalInvoiceRepository = manager.withRepository(this.invoiceRepository)
                return await transactionalInvoiceRepository.updateStatusInvoice(manager , storeId , invoiceId , statusInvoice)
            })
            return {
                status : 200,
                message : "Le statut de la facture a été modifié avec succès",
                id : invoiceStatusUpdated.id
            }
        } catch (error) {return ExceptionHandler.handleError(error)}
    }
    async getInvoiceByStatus(storeId : number , status :  InvoiceTransactionStatus){
        try {
            const invoices = await this.invoiceRepository.getInvoiceByStatus(storeId , status)
            return {
                status : 200,
                response_data : invoices} as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }

    }

}