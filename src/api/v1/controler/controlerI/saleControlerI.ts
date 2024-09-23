import { Response, Request } from "express";

export interface SaleControlerI {
    createSale: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    getDataSaleStoreThisDay: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    getDataSaleByStore: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
}