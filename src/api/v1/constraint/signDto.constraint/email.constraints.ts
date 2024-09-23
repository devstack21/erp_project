import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UserRepository } from '../../repository/userRepository';
import { ClientRepository } from '../../repository/clientRepository';

@ValidatorConstraint({ name: 'emailValidate', async: false })
export class EmailUniqueValidate implements ValidatorConstraintInterface {
    private readonly clientRepository = ClientRepository

   async validate(email: string, args: ValidationArguments) : Promise<boolean>
    {
        const user = await this.clientRepository.findByEmail(email)
        return !(user.length > 0)
    }

    defaultMessage(args: ValidationArguments) {
        return 'Email already exists';
    }
}