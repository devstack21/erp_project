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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const country_dto_1 = require("../dto/country.dto");
const cityRepository_1 = require("../repository/cityRepository");
const city_mapper_1 = __importDefault(require("./city.mapper"));
class CountryMapper {
    constructor() {
        this.cityRepository = cityRepository_1.CityRepository;
    }
    toDto(country) {
        return __awaiter(this, void 0, void 0, function* () {
            const countryDto = new country_dto_1.CountryDto();
            countryDto.name = country.name;
            countryDto.code = country.code;
            countryDto.cities = yield this.getCity(country);
            return countryDto;
        });
    }
    toDtoArray(countries) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(countries.map(country => this.toDto(country)));
        });
    }
    getCity(country) {
        return __awaiter(this, void 0, void 0, function* () {
            const cities = yield this.cityRepository.getCityByCountryId(country.id);
            if (cities.length == 0)
                return [];
            return city_mapper_1.default.toDtoArray(cities);
        });
    }
}
exports.default = new CountryMapper();
