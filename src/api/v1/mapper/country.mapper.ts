import { Country } from "../db/models/country.model"
import { CountryDto } from "../dto/country.dto";
import { MapperI } from "./mapperI/mapperI"
import { City } from "../db/models/city.models";
import { CityRepository } from "../repository/cityRepository";
import cityMapper from "./city.mapper";

class CountryMapper implements MapperI {
    private cityRepository = CityRepository

    async toDto(country : Country){
       const countryDto = new CountryDto()
       countryDto.name = country.name
       countryDto.code = country.code
       countryDto.cities = await this.getCity(country)
       return countryDto
    }
    async toDtoArray(countries : Country[]) : Promise<CountryDto[]>{
        return Promise.all(countries.map(country => this.toDto(country)));
    }
    private async getCity(country : Country){
        const cities : City[] = await this.cityRepository.getCityByCountryId(country.id)
        if(cities.length == 0) return []
        return cityMapper.toDtoArray(cities)

    }
}

export default new CountryMapper()