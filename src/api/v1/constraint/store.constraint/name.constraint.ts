import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { StoreRepository } from '../../repository/storeRepository';

@ValidatorConstraint({ name: 'nameStoreValidate', async: false })
export class NameStoreUniqueValidate implements ValidatorConstraintInterface {
    private readonly storeRepository = StoreRepository
    
   async validate(nameStore: string, args: ValidationArguments) {
        const store = await this.storeRepository.findByName(nameStore)
        return !store
    }

    defaultMessage(args: ValidationArguments) {
        return 'name store already exists';
    }
}