import { Response, Request } from "express"
export interface ControlArticleControlerI {
    createArticle: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    getArticle: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    updateArticle: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
    deleteArticle: (request: Request, response: Response) => Response<any, Record<string, any>> | undefined;
}