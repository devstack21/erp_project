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
exports.DistrictRepository = void 0;
const district_models_1 = require("../db/models/district.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const district_mapper_1 = __importDefault(require("../mapper/district.mapper"));
exports.DistrictRepository = ormconfig_1.default.getRepository(district_models_1.District).extend({
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield this.findOne({ where: { name } });
            return district ? district : undefined;
        });
    },
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield this.findOne({ where: { code } });
            return district ? district : undefined;
        });
    },
    findByCity(cityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({ where: { city: { id: cityId } } });
        });
    },
    getDistrictByCityId(cityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find({
                where: {
                    city: { id: cityId }
                }
            });
        });
    },
    getListDistrict(districtId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = this.createQueryBuilder('district');
                if (districtId) {
                    const district = yield this.findOne({ where: { id: districtId } });
                    if (!district)
                        throw new domainException_1.DomainError("Le quartier spécifié n'existe pas", 400, 'District', 'ID district not found');
                    query = query.andWhere('district.id = :districtId', { districtId });
                }
                const districts = yield query.getMany();
                return district_mapper_1.default.toDtoArray(districts);
            }
            catch (error) {
                throw error;
            }
        });
    }
});
