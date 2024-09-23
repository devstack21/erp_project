import { Request , Response } from "express";

export interface BillingControlerI {
    getInvoiceByStoreThisDay: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    getInvoiceByStore: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    getInvoiceByStatus: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    updateStatusInvoice: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    updateDetailsInvoiceNotPaid: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
}