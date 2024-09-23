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
const unitMeasureDto_1 = require("../dto/unitMeasureDto");
class UnitMapper {
    toDto(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitMeasureDto = new unitMeasureDto_1.UnitMeasurerDto();
            unitMeasureDto.id = unit.id;
            unitMeasureDto.libelle = unit.libelle;
            unitMeasureDto.code = unit.code;
            return unitMeasureDto;
        });
    }
    toDtoArray(units) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(units.map(unit => this.toDto(unit)));
        });
    }
}
exports.default = new UnitMapper();
