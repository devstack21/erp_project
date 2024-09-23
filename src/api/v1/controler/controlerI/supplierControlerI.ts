import { Response, Request } from "express";

export interface SupplierControlerI {
    createSupplierStore: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    updateSupplierStore: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    getSupplierStore: (request: Request, response: Response) => void;
    deleteSupplierStore: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
}