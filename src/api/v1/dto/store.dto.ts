import { IsString,IsNotEmpty, Matches, IsPositive} from 'class-validator';
import { NameStoreUniqueValidate } from '../constraint/store.constraint/name.constraint';
import { Validate } from 'class-validator';
export class StoreDto {

    
    id!:number
    
    @Validate(NameStoreUniqueValidate, {
        message: 'Name store exists already'
    })
    @IsString({message : "Store name must be a string"})
    @IsNotEmpty({ message: "Store name must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _'\-]+$/u, {
        message: 'Store name can only contain letters, numbers, underscores, dashes, and spaces'
    })
    name!: string;

    @IsString({message : "District must be a string"})
    @IsNotEmpty({ message: "District name must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'District name can only contain letters, numbers, underscores, dashes, and spaces'
    })
    districtName!: string;

    @IsString({message : "Libelle type store must be a string"})
    @IsNotEmpty({ message: "Libelle type store must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'Libelle type store can only contain letters, numbers, underscores, dashes, and spaces'
    })
    typeStore!: string;
}