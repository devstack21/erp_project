
import { ValidationError } from "class-validator";

import { utilsValidationErrorInterface } from "./utilsI/utilsValidationError";
import { MessageValidationSupplierError } from "../domain/error.domain";
import { ValidationSupplierException } from "../exception/validationSupplierException";

export default class ValidationErrorSupplier implements utilsValidationErrorInterface {
    responseValidateError (errors: ValidationError[]): MessageValidationSupplierError {
        const msg : any = {}
        const errorMessages: Array<string> = ['name', 'phone'];
        errors.forEach((error) => {
            const property : any = error.property as keyof MessageValidationSupplierError;
            if (errorMessages.includes(property)) {
                
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            } 
            else throw new ValidationSupplierException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
      
        return msg as MessageValidationSupplierError;
    }
}
