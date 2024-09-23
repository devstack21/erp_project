
import { ValidationError } from "class-validator";
import { MessageValidationStoreError } from "../domain/error.domain";
import { ValidationStoreException } from "../exception/validationStoreException";
import { utilsValidationErrorInterface } from "./utilsI/utilsValidationError";

export default class ValidationErrorStore implements utilsValidationErrorInterface {
    responseValidateError (errors: ValidationError[]): MessageValidationStoreError {
        const msg : any = {}
        const errorMessages: Array<string> = ['name', 'typeStore', 'districtName'];
        errors.forEach((error) => {
            const property : any = error.property as keyof MessageValidationStoreError;
            if (errorMessages.includes(property)) {
                
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            } 
            else throw new ValidationStoreException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
      
        return msg as MessageValidationStoreError;
    }
}
