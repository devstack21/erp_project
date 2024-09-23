import { AppException } from "./AppException";
import { MessageAppExceptionError } from "../domain/error.domain";
import { MessageStockError } from "../domain/error.domain";

export class OutStockException extends AppException{
    public readonly errors: MessageStockError;
    public static readonly statusCode: number = 400;
    public readonly field?: Array<string>;
    public static readonly errorCode : string = 'OOS_ERR_00'
  
    constructor(errors: MessageStockError, message : string, reason : string) {
        super(message, OutStockException.statusCode , OutStockException.errorCode , reason );
        this.errors = errors;
    }
    getMessageException() : MessageAppExceptionError  {
      const messageException = super.getMessageException()
      messageException['errors'] = this.errors
      return messageException
   };
  }