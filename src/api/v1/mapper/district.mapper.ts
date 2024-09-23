import { District } from "../db/models/district.models"
import { MapperI } from "./mapperI/mapperI"
import { DistrictDto } from "../dto/district.dto"
class DistrictMapper implements MapperI {

    async toDto(district : District){
        const districtDto = new DistrictDto()
        districtDto.id = district.id
        districtDto.name = district.name
        districtDto.code = district.code
        return districtDto
    }
    async toDtoArray(districts : District[]) : Promise<DistrictDto[]>{
        return Promise.all(districts.map(district => this.toDto(district)));
    }
}

export default new DistrictMapper()