import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { SupplierRepository } from '../../repository/supplierRepository';

@ValidatorConstraint({ name: 'nameSupplierStoreValidate', async: false })
export class NameSupplierUniqueValidate implements ValidatorConstraintInterface {
    private readonly supplierRepository = SupplierRepository
    
   async validate(nameSupplier: string, args: ValidationArguments) {
        const supplier = await this.supplierRepository.findByName(nameSupplier)
        return !supplier
    }

    defaultMessage(args: ValidationArguments) {
        return 'name supplier already exists';
    }
}