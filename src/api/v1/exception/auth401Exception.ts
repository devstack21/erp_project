import { AppException } from "./AppException";

export class Auth401Exception extends AppException{
      
    private static readonly statusCode = 401
    private static readonly errorCode = 'AUTH_ERR_00';
    
    constructor(message: string,  reason:string) {
        //call super constructor
        super(message, Auth401Exception.statusCode , Auth401Exception.errorCode , reason );
        
    }
  }