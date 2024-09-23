import { Response, Request } from "express";

export interface AlertStockControlerI {
    getAlertStore: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined
}