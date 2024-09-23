
import { Request , Response } from "express"
import BillingService from "../service/billingService"
import { InvoiceTransactionStatus } from "../enum/enum.cte"
import ValidationErrorSaleItem from "../utils/validationError.saleItem"
import { SaleItemDto } from "../dto/saleItem.dto"
import { BillingControlerI } from "./controlerI/billingControlerI"

class BillingControler implements BillingControlerI {
    
    private readonly billingService : BillingService
    constructor(billingService : BillingService){
        this.billingService = billingService
    }
    getInvoiceByStoreThisDay = (request : Request , response : Response) =>{
        const storeId : number = parseInt(request.params.storeId , 10)
        if(!storeId) return response.json({status : 400 , message : "L'identifiant du magasin n'est pas defini"})
        
        const invoiceId : number = request.query.invoice ? parseInt(request.query.invoice as string , 10) : 0
        this.billingService.getInvoiceByStoreThisDay(storeId , invoiceId)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    getInvoiceByStore = (request : Request , response : Response) =>{
        const storeId : number = parseInt(request.params.storeId , 10)
        if(!storeId) return response.json({status : 400 , message : "L'identifiant du magasin n'est pas defini"})

        const invoiceId : number = request.query.invoice ? parseInt(request.query.invoice as string , 10) : 0
        this.billingService.getInvoiceByStore(storeId , invoiceId)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    getInvoiceByStatus = (request : Request , response : Response) =>{
        const storeId: number = parseInt(request.params.storeId, 10);
        if (!storeId) return response.json({ status: 400, message: "L'identifiant du magasin n'est pas défini" });

        const statusInvoice: string | undefined = request.query.status as string;
        if (!statusInvoice) return response.json({ status: 400, message: "Le statut de la facture n'est pas défini" });

        // Vérifiez si le statut est valide
        const statusEnum = Object.values(InvoiceTransactionStatus).includes(statusInvoice as InvoiceTransactionStatus);
        if (!statusEnum) return response.json({ status: 400, message: "Le statut de la facture est invalide" });

        this.billingService.getInvoiceByStatus(storeId , statusInvoice as InvoiceTransactionStatus)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    updateStatusInvoice = (request  : Request, response : Response)  => {
        const storeId: number = parseInt(request.params.storeId, 10);
        if (!storeId) return response.json({ status: 400, message: "L'identifiant du magasin n'est pas défini" });

        const invoiceId: number = request.query.invoice ? parseInt(request.query.invoice as string, 10) : 0;
        if (!invoiceId) return response.json({ status: 400, message: "L'identifiant de la facture n'est pas défini" });

        const statusInvoice: string | undefined = request.query.status as string;
        if (!statusInvoice) return response.json({ status: 400, message: "Le statut de la facture n'est pas défini" });
        // Vérifiez si le statut est valide
        const statusEnum = Object.values(InvoiceTransactionStatus).includes(statusInvoice as InvoiceTransactionStatus);
        if (!statusEnum) return response.json({ status: 400, message: "Le statut de la facture est invalide" });

        this.billingService.updateStatusInvoice(storeId, invoiceId, statusInvoice as InvoiceTransactionStatus)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
    updateDetailsInvoiceNotPaid = (request : Request , response : Response) =>{
        const storeId: number = parseInt(request.params.storeId, 10);
        if (!storeId) return response.json({ status: 400, message: "L'identifiant du magasin n'est pas défini" });

        const invoiceId: number = request.query.invoice ? parseInt(request.query.invoice as string, 10) : 0;
        if (!invoiceId) return response.json({ status: 400, message: "L'identifiant de la facture n'est pas défini" });

        const saleItems : SaleItemDto[] = request.body.saleItems ? request.body.saleItems : []
        this.billingService.updateDetailsInvoiceNotPaid(storeId ,invoiceId , saleItems)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
}
export default new BillingControler(new BillingService(
    new ValidationErrorSaleItem()
))