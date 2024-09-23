import { IsString,IsNotEmpty, Length, IsPositive, Validate } from 'class-validator';
import { Matches } from 'class-validator';
import { NameSupplierUniqueValidate } from '../constraint/supplier.constraint/name.constraint';
export class SupplierDto {
    
    id!:number
    
    @Validate(NameSupplierUniqueValidate, {
        message: 'Name supplier exists already'
    })
    @IsString({message : "name supplier must be a string"})
    @IsNotEmpty({ message: "name supplier must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _'.\-]+$/u, {
        message: 'name supplier can only contain letters, numbers, underscores, dashes, spaces, apostrophes, and periods'
    })
    name!:string

    //unique phone validation
    @IsString()
    @Length(9)
    @IsNotEmpty({message : "phone must be not empty "})
    phone!:string 
}