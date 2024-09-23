import { CityDto } from "./city.dto";

export class CountryDto {
    id!:number

    name!: string;

    code!: string;

    cities!: CityDto[]

}