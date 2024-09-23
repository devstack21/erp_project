
import { ValidationError } from "class-validator";
import { MessageValidationError } from "../domain/error.domain";
import { ValidationException } from "../exception/validationException";
import { utilsValidationErrorInterface } from "./utilsI/utilsValidationError";

export default class ValidationErrorAuth implements utilsValidationErrorInterface {
    responseValidateError(errors: ValidationError[]): MessageValidationError {
        const msg : any = {}
        const errorMessages: Array<string> = [
            'email',
            'phone',
            'username',
            'pwd',
            'districtName'
        ];
        errors.forEach((error) => {
            const property : any = error.property as keyof MessageValidationError;
            if (errorMessages.includes(property)) {

                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            } 
            else throw new ValidationException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
      
        return msg as MessageValidationError;
    }
}
