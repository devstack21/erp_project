import { IsString,IsNotEmpty} from 'class-validator';
import { Matches } from 'class-validator';

export class UnitMeasurerDto {
  
    id!: number 
    
    @IsString({message : "name must be a string"})
    @IsNotEmpty({ message: "Unit measure must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _'.\-]+$/u, {
        message: 'libelle can only contain letters, numbers, underscores, dashes, spaces, apostrophes, and periods'
    })
    libelle!:string

    //unique code unit measure
    @IsString()
    @IsNotEmpty({message : "code be not empty "})
    @Matches(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'unit measure code can only contain letters, numbers, underscores, dashes, and spaces'
    })
    code!:string 
}