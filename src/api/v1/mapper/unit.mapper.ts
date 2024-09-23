import { MapperI } from "./mapperI/mapperI"
import { UnitMeasure } from "../db/models/unitMeasure.models"
import { UnitMeasurerDto } from "../dto/unitMeasureDto"

class UnitMapper implements MapperI {

    async toDto(unit: UnitMeasure){
        const unitMeasureDto = new UnitMeasurerDto()
        unitMeasureDto.id = unit.id
        unitMeasureDto.libelle = unit.libelle
       unitMeasureDto.code = unit.code
        return unitMeasureDto
    }
    async toDtoArray(units : UnitMeasure[]) : Promise<UnitMeasurerDto[]>{
        return Promise.all(units.map(unit => this.toDto(unit)));
    }
}

export default new UnitMapper()