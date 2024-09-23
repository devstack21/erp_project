import { AppException } from "./AppException";
import { MessageAppExceptionError } from "../domain/error.domain";
import { MessageStockError } from "../domain/error.domain";

export class InsufficientStockException extends AppException{
    public readonly errors: MessageStockError;
    public static readonly statusCode: number = 400;
    public readonly field?: Array<string>;
    public static readonly errorCode : string = 'ISTOCK_ERR_00'
  
    constructor(errors: MessageStockError, message : string, reason : string) {
        super(message, InsufficientStockException.statusCode , InsufficientStockException.errorCode , reason );
        this.errors = errors;
    }
    getMessageException() : MessageAppExceptionError  {
      const messageException = super.getMessageException()
      messageException['errors'] = this.errors
      return messageException
   };
  }