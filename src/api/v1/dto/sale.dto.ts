import {IsArray, IsNotEmpty,IsPositive, IsString} from 'class-validator';
import { SaleItemDto } from './saleItem.dto';
import { MethodPayment } from '../enum/enum.cte';
export class SaleDto {

    
    id!:number
    
    @IsPositive({message : "Total amount sale must be positive"})
    @IsNotEmpty({ message: "Total amount sale must not be empty" })
    totalAmount!:number

    @IsArray({message : "Sale items must be a array"})
    saleItems!: SaleItemDto[]

    methodPayment!: MethodPayment

}