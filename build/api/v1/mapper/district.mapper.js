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
const district_dto_1 = require("../dto/district.dto");
class DistrictMapper {
    toDto(district) {
        return __awaiter(this, void 0, void 0, function* () {
            const districtDto = new district_dto_1.DistrictDto();
            districtDto.id = district.id;
            districtDto.name = district.name;
            districtDto.code = district.code;
            return districtDto;
        });
    }
    toDtoArray(districts) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(districts.map(district => this.toDto(district)));
        });
    }
}
exports.default = new DistrictMapper();
