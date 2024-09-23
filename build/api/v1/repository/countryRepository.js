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
exports.CountryRepository = void 0;
const country_model_1 = require("../db/models/country.model");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const country_mapper_1 = __importDefault(require("../mapper/country.mapper"));
exports.CountryRepository = ormconfig_1.default.getRepository(country_model_1.Country).extend({
    findByCountrytname(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const country = yield this.findOne({ where: { name } });
            return country ? country : undefined;
        });
    },
    getListCountry(countryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = this.createQueryBuilder('country');
                if (countryId) {
                    const country = yield this.findOne({ where: { id: countryId } });
                    if (!country)
                        throw new domainException_1.DomainError("Le pays spécifié n'existe pas", 400, 'Country', 'ID country not found');
                    query = query.andWhere('country.id = :countryId', { countryId });
                }
                const countries = yield query.getMany();
                return country_mapper_1.default.toDtoArray(countries);
            }
            catch (error) {
                throw error;
            }
        });
    }
});
