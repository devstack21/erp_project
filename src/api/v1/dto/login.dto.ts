import { IsString, IsEmail, Validate, IsNotEmpty } from 'class-validator';
import { PasswordValidate } from '../constraint/signDto.constraint/mdp.constraint';

export class LoginDto {
  
  @IsEmail()
  @IsNotEmpty({message : "email must be not empty "})
  email!: string;

  @Validate(PasswordValidate, {
    message: 'The password must contain a maximum of 8 characters , 1 number , 2 capital letters e',
  })
  
  @IsString()
  @IsNotEmpty({message : "pwd must be not empty"})
  pwd!: string;

}