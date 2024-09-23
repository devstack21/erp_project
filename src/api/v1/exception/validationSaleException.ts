import { MessageValidationSaleItemError} from "../domain/error.domain";
import { AppException } from "./AppException";
import { MessageAppExceptionError } from "../domain/error.domain";

export class ValidationSaleException extends AppException{
    public readonly errors: MessageValidationSaleItemError;
    public static readonly statusCode: number = 400;
    public readonly field?: Array<string>;
    public static readonly errorCode : string = 'SALE_ERR_00'
  
    constructor(errors: MessageValidationSaleItemError, message : string, reason : string , field?: Array<string>) {
        super(message, ValidationSaleException.statusCode , ValidationSaleException.errorCode , reason );
        this.errors = errors;
        this.field = field
    }
    getMessageException() : MessageAppExceptionError  {
      const messageException = super.getMessageException()
      messageException['errors'] = this.errors
      messageException['field'] = this.field 
      return messageException
   };
  }