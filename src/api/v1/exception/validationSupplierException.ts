import { MessageValidationStoreError } from "../domain/error.domain";
import { AppException } from "./AppException";
import { MessageAppExceptionError } from "../domain/error.domain";

export class ValidationSupplierException extends AppException{
    public readonly errors: MessageValidationStoreError;
    public static readonly statusCode: number = 400;
    public readonly field?: Array<string>;
    public static readonly errorCode : string = 'SUPP_ERR_00'
  
    constructor(errors: MessageValidationStoreError, message : string, reason : string , field?: Array<string>) {
        super(message, ValidationSupplierException.statusCode , ValidationSupplierException.errorCode , reason );
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