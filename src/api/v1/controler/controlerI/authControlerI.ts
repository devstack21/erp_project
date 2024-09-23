import { Response, Request } from "express";

export interface AuthControlerI {
    signup: (request: Request, response: Response) => void;
    login: (request: Request, response: Response) => void;
    logout: (request: Request, response: Response) => void;
}