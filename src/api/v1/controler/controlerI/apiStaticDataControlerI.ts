import { Request, Response } from "express";

export interface ApiStaticDataControlerI {
    getListCity: (request: Request, response: Response) => void
    getListCountry: (request: Request, response: Response) => void
    getListDistrict: (request: Request, response: Response) => void
    getListTypeArticle: (request: Request, response: Response) => void
    getListTypeStore: (request: Request, response: Response) => void
    getListUnitMeasure: (request: Request, response: Response) => void
}