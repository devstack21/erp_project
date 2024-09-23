
import { Country } from '../db/models/country.model';
import dbInstance from '../db/ormconfig';
import { DomainError } from '../exception/domainException';
import countryMapper from '../mapper/country.mapper';
export const CountryRepository = dbInstance.getRepository(Country).extend({
    async findByCountrytname(name: string): Promise<Country | undefined> {
        const country = await this.findOne({where : {name}})
        return country ?country : undefined
      
    },
    async getListCountry(countryId : number){
        try {
            let query = this.createQueryBuilder('country') 
            if(countryId){
                const country = await this.findOne({where : {id : countryId}})
                if(!country) throw new DomainError("Le pays spécifié n'existe pas", 400, 'Country', 'ID country not found');
                query = query.andWhere('country.id = :countryId', {countryId})
            }  
            const countries = await query.getMany()
            return countryMapper.toDtoArray(countries)     
        } catch (error) {
            throw error
        }
    }
})

