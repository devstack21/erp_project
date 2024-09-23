import { District } from '../db/models/district.models'; 
import dbInstance from '../db/ormconfig';
import { DomainError } from '../exception/domainException';
import districtMapper from '../mapper/district.mapper';
export const DistrictRepository = dbInstance.getRepository(District).extend({
    async findByName(name: string): Promise<District | undefined> {
        const district = await this.findOne({ where: { name } });
        return district ? district : undefined;
    },
    async findByCode(code: string): Promise<District | undefined> {
        const district = await this.findOne({ where: { code } });
        return district ? district : undefined;
    },
    async findByCity(cityId: number): Promise<District[]> {
        return this.find({ where: { city: { id: cityId } } });
    },
    async getDistrictByCityId(cityId : number){
        return this.find({
            where : {
                city : {id  : cityId}
            }
        })
    },
    async getListDistrict(districtId : number){
        try {
            let query = this.createQueryBuilder('district') 
            if(districtId){
                const district = await this.findOne({where : {id : districtId}})
                if(!district) throw new DomainError("Le quartier spécifié n'existe pas", 400, 'District', 'ID district not found');
                query = query.andWhere('district.id = :districtId', {districtId})
            }  
            const districts = await query.getMany()
            return districtMapper.toDtoArray(districts)
        } catch (error) {
            throw error
        }
    }
});
