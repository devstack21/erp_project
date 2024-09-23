import { City } from '../db/models/city.models'; 
import dbInstance from '../db/ormconfig';
import { DomainError } from '../exception/domainException';
import cityMapper from '../mapper/city.mapper';

export const CityRepository = dbInstance.getRepository(City).extend({
    
    async findByName(name: string): Promise<City | undefined> {
        const city = await this.findOne({ where: { name } });
        return city ? city : undefined;
    },

    
    async findByCode(code: string): Promise<City | undefined> {
        const city = await this.findOne({ where: { code } });
        return city ? city : undefined;
    },

    async findByCountry(countryId: number): Promise<City[]> {
        return this.find({ where: { country: { id: countryId } } });
    },

    async getListCity(cityId : number){
        try {
            let query = this.createQueryBuilder('city')        
            if(cityId){
                const city = await this.findOne({where : {id : cityId}})
                if(!city) throw new DomainError("La ville spécifiée n'existe pas", 400, 'City', 'ID city not found');
                query = query.andWhere('city.id = :cityId', {cityId})
            }
            const cities = await query.getMany()
            return cityMapper.toDtoArray(cities)
        } catch (error) {
            throw error
        }
    },
    async getCityByCountryId(countryId : number){
        return this.find({
            where : {
                country : {id : countryId}
            }
        })
    }
});
