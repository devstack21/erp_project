import { Response, Request } from "express";

export interface StoreControlerI {
    addStore: (request: Request, response: Response) => Promise<void>;
    getStore: (request: Request, response: Response) => Promise<void>;
    updateStore: (request: Request, response: Response) => Promise<void>;
    deleteStore: (request: Request, response: Response) => Promise<void>;
}