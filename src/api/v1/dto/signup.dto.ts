import { IsString, IsEmail, Length, IsNumber, Validate, IsNotEmpty, Matches, IsPositive } from 'class-validator';
import { PasswordValidate } from '../constraint/signDto.constraint/mdp.constraint';
import { EmailUniqueValidate } from '../constraint/signDto.constraint/email.constraints';

export class SignupDto {
  
  @IsString()
  @Length(1, 50)
  @IsNotEmpty({message : "username must be not empty"})
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'Username can only contain letters, numbers, underscores, and dashes'
})
  username!: string;


  @Validate(EmailUniqueValidate , {
    message : 'email already exists'
  })
  @IsEmail()
  @IsNotEmpty({message : "email must be not empty "})
  email!: string;

  // define validation unique 
  @IsString()
  @Length(9)
  @IsNotEmpty({message : "phone must be not empty "})
  phone!:string 

  @Validate(PasswordValidate, {
    message: 'The password must contain a maximum of 8 characters , 1 number , 2 capital letters e',
  })
  @IsString()
  @IsNotEmpty({message : "pwd must be not empty"})
  pwd!: string;

  @IsString()
  @IsNotEmpty({message : "district name must be not empty"})
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'Username can only contain letters, numbers, underscores, and dashes'
})
  districtName!:string 

}