import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

import { ClientRepository } from '../../repository/clientRepository';

@ValidatorConstraint({ name: 'phoneUniqueValidate', async: false })
export class PhoneUniqueValidate implements ValidatorConstraintInterface {
    private readonly clientRepository = ClientRepository

   async validate(phone: string, args: ValidationArguments) : Promise<boolean>
    {
        const user = await this.clientRepository.findByPhone(phone)
        
        return !(user.length > 0)
    }

    defaultMessage(args: ValidationArguments) {
        return 'phone already exists';
    }
}