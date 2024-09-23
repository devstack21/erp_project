import { StoreDto } from "../dto/store.dto";
import { Store } from "../db/models/store.models";
import { MapperI } from "./mapperI/mapperI";
import { DistrictRepository } from "../repository/districtRepository";
import { DomainError } from "../exception/domainException";
import { TypeStoreRepository } from "../repository/typeStoreRepository";

class StoreMapper implements MapperI{

    private readonly districtRepository = DistrictRepository
    private readonly typeStoreRepository = TypeStoreRepository

    async toDto (store : Store) : Promise<StoreDto> {
        const storeDto = new StoreDto()
        storeDto.id = store.id
        storeDto.name = store.name;
        storeDto.districtName = await this.getDistrictName(store)
        storeDto.typeStore = await this.getLibelleTypeStore(store)
        return storeDto
    }
    async toDtoArray(stores: Store[] ): Promise<StoreDto[]> {
        return Promise.all(stores.map(store => this.toDto(store)));
    }
    private async getDistrictName(store: Store): Promise<string> {
        const district = await this.districtRepository.findOne({ where: { id: store.district.id } });
        if (!district) throw new DomainError("Ce quartier n'existe pas", 400, 'District', 'district not found');
        return district.name;
    }
    private async getLibelleTypeStore(store: Store): Promise<string> {
        const typeStore = await this.typeStoreRepository.findOne({ where: { id: store.typeStore.id } });
        if (!typeStore) throw new DomainError("Ce type de boutique n'existe pas", 400, 'TypeStore', 'typestore not found');
        return typeStore.libelle;

    }
}
export default new StoreMapper()