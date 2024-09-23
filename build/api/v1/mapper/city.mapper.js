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
const city_dto_1 = require("../dto/city.dto");
const districtRepository_1 = require("../repository/districtRepository");
const district_dto_1 = require("../dto/district.dto");
class CityMapper {
    constructor() {
        this.districtRepository = districtRepository_1.DistrictRepository;
    }
    toDto(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityDto = new city_dto_1.CityDto();
            cityDto.id = city.id;
            cityDto.name = city.name;
            cityDto.code = city.code;
            cityDto.districts = yield this.getDistrict(city);
            return cityDto;
        });
    }
    toDtoArray(cities) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(cities.map(city => this.toDto(city)));
        });
    }
    getDistrict(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const districts = yield this.districtRepository.getDistrictByCityId(city.id);
            if (districts.length == 0)
                return [];
            return districts.map((district) => {
                const districtDto = new district_dto_1.DistrictDto();
                districtDto.id = district.id;
                districtDto.name = district.name;
                districtDto.code = district.code;
                return districtDto;
            });
        });
    }
}
exports.default = new CityMapper();
