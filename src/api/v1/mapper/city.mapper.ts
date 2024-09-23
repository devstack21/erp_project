import { City } from "../db/models/city.models"
import { MapperI } from "./mapperI/mapperI"
import { CityDto } from "../dto/city.dto"
import { DistrictRepository } from "../repository/districtRepository"
import { DistrictDto } from "../dto/district.dto"
import { District } from "../db/models/district.models"
class CityMapper implements MapperI {

    private readonly districtRepository = DistrictRepository
    async toDto(city : City){
        const cityDto = new CityDto()
        cityDto.id = city.id
        cityDto.name = city.name
        cityDto.code = city.code
        cityDto.districts = await this.getDistrict(city)
        return cityDto
    }
    async toDtoArray(cities : City[]) : Promise<CityDto[]>{
        return Promise.all(cities.map(city => this.toDto(city)));
    }
    private async getDistrict(city : City){
        const districts : District[] = await this.districtRepository.getDistrictByCityId(city.id)
        if(districts.length == 0) return []
        return districts.map((district) => {
            const districtDto = new DistrictDto()
            districtDto.id = district.id
            districtDto.name = district.name
            districtDto.code = district.code
            return districtDto
        })  
    }
}

export default new CityMapper()