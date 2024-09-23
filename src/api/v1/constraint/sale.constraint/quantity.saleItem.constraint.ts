import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'quantitySaleItemValidate', async: false })
export class QuantitySaleItemNotZero implements ValidatorConstraintInterface {
    
   async validate(qteSaleItem: number, args: ValidationArguments) {
        return qteSaleItem != 0
    }

    defaultMessage(args: ValidationArguments) {
        return 'Quantity saleItem must be different to zero';
    }
}