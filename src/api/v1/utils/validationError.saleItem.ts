
import { ValidationError, validate } from "class-validator";
import { MessageValidationSaleItemError } from "../domain/error.domain";
import { utilsValidationErrorInterface } from "./utilsI/utilsValidationError";
import { SaleItemDto } from "../dto/saleItem.dto";
import { plainToClass } from "class-transformer";
import { ValidationSaleException } from "../exception/validationSaleException";


export default class ValidationErrorSaleItem implements utilsValidationErrorInterface {

    responseValidateError (errors: ValidationError[]): MessageValidationSaleItemError {
        const msg : any = {}
        const errorMessages: Array<string> = ['article', 'quantity','price'];
        errors.forEach((error) => {
            const property : any = error.property as keyof MessageValidationSaleItemError;
            if (errorMessages.includes(property)) {
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            } 
            else throw new ValidationSaleException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
      
        return msg as MessageValidationSaleItemError;
    }
   async responseValidationSaleItems (saleLines : SaleItemDto[]){
        for( const saleLine  of  saleLines){
            const createSaleItemDto = plainToClass(SaleItemDto , saleLine)
            const errors = await validate(createSaleItemDto)
            if(errors.length > 0){
                const errorsValidation = this.responseValidateError(errors)
                throw new ValidationSaleException(errorsValidation , `erreur de validation de la ligne vente de l'article ${saleLine.article}`, 
                    `Validation sale item article ${saleLine.article}`)
                
            }
        }
    }
}
