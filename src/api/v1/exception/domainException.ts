import { MessageAppExceptionError, MessageValidationError } from "../domain/error.domain";
import { AppException } from "./AppException";

export class DomainError extends AppException {
  
    private static readonly errorCode = 'DOM_ERR_00';
    public readonly model : string ;
 

  constructor(message: string, statusCode : number ,  model : string, reason : string ) {
    super(message, statusCode , DomainError.errorCode , reason );
      this.model = model   
  }

 getMessageException() : MessageAppExceptionError  {
    const messageException = super.getMessageException()
    messageException['model'] = this.model
    return messageException
 };
}
