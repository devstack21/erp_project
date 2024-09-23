import { AppException } from "./AppException";
import { MessageAppExceptionError } from "../domain/error.domain";

export class JwtErrorException extends AppException{
    
    public static readonly statusCode: number = 401;
    public static readonly errorCode : string = 'JWT_ERR_00'
  
    constructor( message : string, reason : string ) {
        super(message, JwtErrorException.statusCode , JwtErrorException.errorCode , reason);
       

    }
    
  }