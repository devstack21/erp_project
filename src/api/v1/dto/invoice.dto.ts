import { IsNotEmpty, IsPositive,IsArray} from 'class-validator';
import { InvoiceTransactionStatus } from '../enum/enum.cte';
import { SaleItemDto } from './saleItem.dto';
import { Validate } from 'class-validator';
import { StatusInvoiceValidate } from '../constraint/invoice.constraints/status.constraint';

export class InvoiceDto {
    id!:number
    
    @IsPositive({message : "Total amount invoice must be positive"})
    @IsNotEmpty({ message: "Total amount invoice must not be empty" })
    totalAmount!:number

    @IsArray({message : "Sale items must be a array"})
    saleItems!: SaleItemDto[]

    @Validate(StatusInvoiceValidate, {
        message: 'Status invoice not define'
    })
    status!: InvoiceTransactionStatus
}