import { MessageValidationInvoiceError, MessageValidationStoreError } from "../domain/error.domain";
import { AppException } from "./AppException";
import { MessageAppExceptionError } from "../domain/error.domain";

export class ValidationInvoiceException extends AppException{
    public readonly errors: MessageValidationInvoiceError;
    public static readonly statusCode: number = 400;
    public readonly field?: Array<string>;
    public static readonly errorCode : string = 'INV_ERR_00'
  
    constructor(errors: MessageValidationInvoiceError, message : string, reason : string , field?: Array<string>) {
        super(message, ValidationInvoiceException.statusCode , ValidationInvoiceException.errorCode , reason );
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