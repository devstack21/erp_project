"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_dto_1 = require("../dto/store.dto");
const districtRepository_1 = require("../repository/districtRepository");
const domainException_1 = require("../exception/domainException");
const typeStoreRepository_1 = require("../repository/typeStoreRepository");
class StoreMapper {
    constructor() {
        this.districtRepository = districtRepository_1.DistrictRepository;
        this.typeStoreRepository = typeStoreRepository_1.TypeStoreRepository;
    }
    toDto(store) {
        return __awaiter(this, void 0, void 0, function* () {
            const storeDto = new store_dto_1.StoreDto();
            storeDto.id = store.id;
            storeDto.name = store.name;
            storeDto.districtName = yield this.getDistrictName(store);
            storeDto.typeStore = yield this.getLibelleTypeStore(store);
            return storeDto;
        });
    }
    toDtoArray(stores) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(stores.map(store => this.toDto(store)));
        });
    }
    getDistrictName(store) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield this.districtRepository.findOne({ where: { id: store.district.id } });
            if (!district)
                throw new domainException_1.DomainError("Ce quartier n'existe pas", 400, 'District', 'district not found');
            return district.name;
        });
    }
    getLibelleTypeStore(store) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeStore = yield this.typeStoreRepository.findOne({ where: { id: store.typeStore.id } });
            if (!typeStore)
                throw new domainException_1.DomainError("Ce type de boutique n'existe pas", 400, 'TypeStore', 'typestore not found');
            return typeStore.libelle;
        });
    }
}
exports.default = new StoreMapper();
