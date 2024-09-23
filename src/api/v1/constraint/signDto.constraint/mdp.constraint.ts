import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'passwordValidate', async: false })
export class PasswordValidate implements ValidatorConstraintInterface {
  
  private static pwdRegex = /^(?=.*[a-z])(?=.*[A-Z]{0,2})(?=.*[@_]{0,2})(?=.{8,})/;
  validate(pwd: string, args: ValidationArguments) {
    return PasswordValidate.pwdRegex.test(pwd); 
  }

  defaultMessage(args: ValidationArguments) {
    return 'The password must contain a maximum of 8 characters , 1 number , 2 capital letters e';
  }
}