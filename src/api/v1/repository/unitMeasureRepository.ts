import { UnitMeasure } from '../db/models/unitMeasure.models';
import dbInstance from '../db/ormconfig';
import { DomainError } from '../exception/domainException';
import unitMapper from '../mapper/unit.mapper';
export const UnitMeasureRepository = dbInstance.getRepository(UnitMeasure).extend({
    async findByCode(code: string): Promise<UnitMeasure | undefined> {
        const unit = await this.findOne({ where: { code : code } });
        return unit ? unit : undefined
    },
    async findByLibelle(libelle: string): Promise<UnitMeasure | undefined> {
        const unit = await this.findOne({ where: {libelle : libelle } });
        return unit ? unit : undefined
    },
    async getListUnitMeasure(unitMeasureId : number){
        try {
            let query = this.createQueryBuilder('unitMeasure') 
            if(unitMeasureId){
                const unit = await this.findOne({where : {id : unitMeasureId}})
                if(!unit) throw new DomainError("L'unité de mesure spécifiée n'existe pas", 400, '  Unit Measure', 'ID Unit Measure not found');
                query = query.andWhere('unitMeasure.id = :unitMeasureId', {unitMeasureId})
            }  
            const units = await query.getMany()
            return unitMapper.toDtoArray(units)     
        } catch (error) {
            throw error
        }
    }
});
