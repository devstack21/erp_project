
import { AppException } from "./AppException";
import { MessageAppExceptionError } from "../domain/error.domain";
import { MessageValidationArticleError } from "../domain/error.domain";

export class ValidationArticleException extends AppException{
    public readonly errors: MessageValidationArticleError;
    public static readonly statusCode: number = 400;
    public readonly field?: Array<string>;
    public static readonly errorCode : string = 'ART_ERR_00'
  
    constructor(errors: MessageValidationArticleError, message : string, reason : string , field?: Array<string>) {
        super(message, ValidationArticleException.statusCode , ValidationArticleException.errorCode , reason );
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