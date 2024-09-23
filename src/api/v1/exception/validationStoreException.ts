import { MessageValidationStoreError } from "../domain/error.domain";
import { AppException } from "./AppException";
import { MessageAppExceptionError } from "../domain/error.domain";

export class ValidationStoreException extends AppException{
    public readonly errors: MessageValidationStoreError;
    public static readonly statusCode: number = 400;
    public readonly field?: Array<string>;
    public static readonly errorCode : string = 'STOR_ERR_00'
  
    constructor(errors: MessageValidationStoreError, message : string, reason : string , field?: Array<string>) {
        super(message, ValidationStoreException.statusCode , ValidationStoreException.errorCode , reason );
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