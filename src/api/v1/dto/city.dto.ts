import { DistrictDto } from "./district.dto";
export class CityDto {
    id!:number

    name!: string;

    code!: string;

    districts!: DistrictDto[]

}