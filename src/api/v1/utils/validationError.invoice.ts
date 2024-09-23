
import { ValidationError } from "class-validator";
import { ValidationStoreException } from "../exception/validationStoreException";
import { utilsValidationErrorInterface } from "./utilsI/utilsValidationError";
import { ValidationInvoiceException } from "../exception/validationInvoiceRepository";
import { MessageValidationInvoiceError } from "../domain/error.domain";

export default class ValidationErrorInvoice implements utilsValidationErrorInterface {
    responseValidateError (errors: ValidationError[]): MessageValidationInvoiceError {
        const msg : any = {}
        const errorMessages: Array<string> = ['totalAmount', 'status'];
        errors.forEach((error) => {
            const property : any = error.property as keyof MessageValidationInvoiceError;
            if (errorMessages.includes(property)) {
                
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            } 
            else throw new ValidationInvoiceException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
      
        return msg as MessageValidationInvoiceError;
    }
}
