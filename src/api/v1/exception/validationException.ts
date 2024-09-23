import { MessageValidationError } from "../domain/error.domain";
import { AppException } from "./AppException";
import { MessageAppExceptionError } from "../domain/error.domain";


export class AppError extends Error {
  public readonly statusCode: number ;
  public readonly codeError : string = 'APP_00'

  constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
  }
}

export class ValidationException extends AppException{
  public readonly errors: MessageValidationError;
  public static readonly statusCode: number = 400;
  public readonly field?: Array<string>;
  public static readonly errorCode : string = 'VAL_ERR_00'

  constructor(errors: MessageValidationError, message : string, reason : string , field?: Array<string>) {
      super(message, ValidationException.statusCode , ValidationException.errorCode , reason );
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