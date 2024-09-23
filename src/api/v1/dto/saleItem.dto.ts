import {IsNotEmpty,IsPositive, IsString, Validate} from 'class-validator';
import { QuantitySaleItemNotZero } from '../constraint/sale.constraint/quantity.saleItem.constraint';

export class SaleItemDto {

    id!: number 

    @IsString({message : "name article saleItem must be a string"})
    @IsNotEmpty({ message: "name article saleItem must not be empty" })
    article!: string

    @Validate(QuantitySaleItemNotZero , { message : 'Quantity saleItem must be different to zero'})
    @IsPositive({message : "Quantity saleItem must be positive"})
    @IsNotEmpty({ message: "Quantity saleItem must not be empty" })
    quantity!:number

    price!:number
}