import { ResponseHttp } from "../../domain/http.domain";
import { SaleItemDto } from "../../dto/saleItem.dto";
import { InvoiceTransactionStatus } from "../../enum/enum.cte";

export interface BillingServiceI {
    getInvoiceByStoreThisDay : (storeId : number ,  invoiceId?: number) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>; 

    updateDetailsInvoiceNotPaid : (storeId : number , invoiceId : number , saleLines : SaleItemDto[]) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>; 

    getInvoiceByStore : (storeId : number ,  invoiceId?: number) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>; 

    updateStatusInvoice : (storeId : number, invoiceId : number, statusInvoice : InvoiceTransactionStatus ) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>;

    getInvoiceByStatus : (storeId : number , status :  InvoiceTransactionStatus) => Promise<ResponseHttp | {
        status: number;
        message: string;
    }>;

}