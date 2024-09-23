import JwtService from "../service/jwtService";
import { Request, Response, NextFunction } from "express";
import { Auth401Exception } from "../exception/auth401Exception";
import ExceptionHandler from "../handlerException/handlerException";

class AuthJwtMiddleware {
    private readonly jwtService : JwtService
    constructor(jwtService : JwtService ){
        this.jwtService = jwtService
    }
    authorizeRequest = async (request : Request , response : Response , next : NextFunction) =>{
        try {
            const authToken = request.headers['authorization'] 
            const token = authToken && authToken.split(' ')[1]
            const client = await this.jwtService.getUserJwtTokenDecrypt(token)
            if(!client) throw new Auth401Exception("Accès refusé", "Access denied");
            
            next()  
        } catch (error) {
            console.error(error)
            return response.json(ExceptionHandler.handleError(error))  
        }
           
    }
}

export default new AuthJwtMiddleware(new JwtService())