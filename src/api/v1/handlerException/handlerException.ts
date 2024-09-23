import { AppException } from "../exception/AppException";
import { MessageAppExceptionError } from "../domain/error.domain";

export default class ExceptionHandler {
    public static handleError(error: any) : MessageAppExceptionError | {
        status: number;
        message: string;
    }{
      console.error('ERROR LOG :: ',error)
        if (error instanceof AppException) {
            return error.getMessageException()
        }
        return {
            status: 500,
            message: 'Une erreur interne du serveur est survenue',
        };
    }
}