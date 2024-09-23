import { MessageAppExceptionError } from "../domain/error.domain";
import { AppExceptionI } from "./exceptionI/ExceptionI";

export class AppException extends Error implements AppExceptionI {

    public readonly statusCode: number;
    public readonly message: string;
    public readonly errorCode : string 
    public readonly reason : string

    constructor(message: string, statusCode: number, errorCode : string, reason:string) {
        super(message);
        this.errorCode = errorCode
        this.statusCode = statusCode;
        this.message = message;
        this.reason = reason
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }

    getMessageException () : MessageAppExceptionError  {
        return {
            status: this.statusCode,
            message: this.message,
            errorCode: this.errorCode,
            reason: this.reason
        };
    };

}