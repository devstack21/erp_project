import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { InvoiceTransactionStatus } from '../../enum/enum.cte';

@ValidatorConstraint({ name: 'statusInvoiceValidate', async: false })
export class StatusInvoiceValidate implements ValidatorConstraintInterface {
      
   async validate(status: InvoiceTransactionStatus, args: ValidationArguments) {
        return Object.values(InvoiceTransactionStatus).includes(status as InvoiceTransactionStatus)
    }
    defaultMessage(args: ValidationArguments) {
        return 'status invoice not define';
    }
}