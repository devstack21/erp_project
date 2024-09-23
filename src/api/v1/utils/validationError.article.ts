
import { ValidationError } from "class-validator";
import { MessageValidationStoreError } from "../domain/error.domain";
import { MessageValidationArticleError } from "../domain/error.domain";
import { ValidationArticleException } from "../exception/validationArticleException";
import { utilsValidationErrorInterface } from "./utilsI/utilsValidationError";

export default class ValidationErrorArticle implements utilsValidationErrorInterface {
    responseValidateError (errors: ValidationError[]): MessageValidationArticleError {
        const msg : any = {}
        const errorMessages: Array<string> = 
            ['name', 
            'code', 
            'selling_price',
            'purchase_price',
            'quantity',
            'typeArticle',
            'categoryArticle',
            'unitMeasure',
            'supplier'];
            
        errors.forEach((error) => {
            const property : any = error.property as keyof MessageValidationArticleError;
            if (errorMessages.includes(property)) {
                
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            } 
            else throw new ValidationArticleException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
      
        return msg as MessageValidationStoreError;
    }
}
