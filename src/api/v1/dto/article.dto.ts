import { IsString,IsNotEmpty, Matches, IsPositive} from 'class-validator';
import { NameArticleUniqueValidate } from '../constraint/article.constraint/name.constraint';
import { CodeArticleUniqueValidate } from '../constraint/article.constraint/code.constraints';
import { Validate } from 'class-validator';
import { SupplierDto } from './supplier.dto';
import { UnitMeasurerDto } from './unitMeasureDto';
import { TypeArticleDto } from './typeArticle.dto';
export class ArticleDto {
    id!:number
    
    @Validate(NameArticleUniqueValidate, {
        message: 'Article name exists already'
    })
    @IsString({message : "Article name must be a string"})
    @IsNotEmpty({ message: "Article name must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _'\-]+$/u, {
        message: 'Article name can only contain letters, numbers, underscores, dashes, spaces, and apostrophes'
    })
    name!: string;

    @Validate(CodeArticleUniqueValidate, {
        message: 'Article code exists already'
    })
    @IsString({message : "Article code must be a string"})
    @IsNotEmpty({ message: "Article code must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'Article code can only contain letters, numbers, underscores, dashes, and spaces'
    })
    code!:string

    @IsPositive({message : "Quantity must be positive"})
    @IsNotEmpty({ message: "Quantity emust not be empty" })
    quantity!:number

    @IsPositive({message : "selling price must be positive"})
    @IsNotEmpty({ message: "Selling princemust not be empty" })
    selling_price!:number

    @IsPositive({message : "selling price must be positive"})
    @IsNotEmpty({ message: "Selling princemust not be empty" })
    purchase_price!:number

    @IsString({message : "Article code must be a string"})
    @IsNotEmpty({ message: "Article code must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'Article type can only contain letters, numbers, underscores, dashes, and spaces'
    })
    typeArticle!:string 


    @IsString({message : "Unit measure must be a string"})
    @IsNotEmpty({ message: "Unit measure must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'Unit measure can only contain letters, numbers, underscores, dashes, and spaces'
    })
    unitMeasure!:string

    @IsString({message : "name must be a string"})
    @IsNotEmpty({ message: "Unit measure must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _'.\-]+$/u, {
        message: 'Supplier can only contain letters, numbers, underscores, dashes, spaces, apostrophes, and periods'
    })
    supplier!:string 

    // data object
    data_supplier!: SupplierDto
    data_unitMeasure!: UnitMeasurerDto
    data_typeArticle!:TypeArticleDto

}