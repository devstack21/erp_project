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
exports.CityRepository = void 0;
const city_models_1 = require("../db/models/city.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const city_mapper_1 = __importDefault(require("../mapper/city.mapper"));
exports.CityRepository = ormconfig_1.default.getRepository(city_models_1.City).extend({
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield this.findOne({ where: { name } });
            return city ? city : undefined;
        });
    },
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield this.findOne({ where: { code } });
            return city ? city : undefined;
        });
    },
    findByCountry(countryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ where: { country: { id: countryId } } });
        });
    },
    getListCity(cityId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = this.createQueryBuilder('city');
                if (cityId) {
                    const city = yield this.findOne({ where: { id: cityId } });
                    if (!city)
                        throw new domainException_1.DomainError("La ville spécifiée n'existe pas", 400, 'City', 'ID city not found');
                    query = query.andWhere('city.id = :cityId', { cityId });
                }
                const cities = yield query.getMany();
                return city_mapper_1.default.toDtoArray(cities);
            }
            catch (error) {
                throw error;
            }
        });
    },
    getCityByCountryId(countryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({
                where: {
                    country: { id: countryId }
                }
            });
        });
    }
});
