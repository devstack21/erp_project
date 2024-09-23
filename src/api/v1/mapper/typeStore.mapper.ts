import { MapperI } from "./mapperI/mapperI"
import { TypeStore } from "../db/models/type.store.models"
import { TypeStoreDto } from "../dto/typeStore.dto"
class TypeStoreMapper implements MapperI {

    async toDto(typeStore: TypeStore){
        const typeStoreDto = new TypeStoreDto()
        typeStoreDto.id = typeStore.id
        typeStoreDto.libelle = typeStore.libelle
        typeStoreDto.description = typeStore.description
        return typeStoreDto
    }
    async toDtoArray(typeStores : TypeStore[]) : Promise<TypeStoreDto[]>{
        return Promise.all(typeStores.map(typeStore => this.toDto(typeStore)));
    }
}

export default new TypeStoreMapper()