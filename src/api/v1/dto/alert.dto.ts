import { IsString,IsNotEmpty, Matches, IsPositive} from 'class-validator';

export class AlertDto {
    id!:number
    
    @IsString({message : "Reason must be a string"})
    @IsNotEmpty({ message: "Reason must not be empty" })
    @Matches(/^[\p{L}\p{M}0-9 _'\-]+$/u, {
        message: 'Reason can only contain letters, numbers, underscores, dashes, spaces, and apostrophes'
    })
    reason!: string;

    @IsString({message : "Reason must be a string"})
    @IsNotEmpty({ message: "Reason must not be empty" })
    article!: string;

}