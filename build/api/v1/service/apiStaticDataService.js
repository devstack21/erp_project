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
const handlerException_1 = __importDefault(require("../handlerException/handlerException"));
const cityRepository_1 = require("../repository/cityRepository");
const countryRepository_1 = require("../repository/countryRepository");
const districtRepository_1 = require("../repository/districtRepository");
const typeArticleRepository_1 = require("../repository/typeArticleRepository");
const typeStoreRepository_1 = require("../repository/typeStoreRepository");
const unitMeasureRepository_1 = require("../repository/unitMeasureRepository");
class ApiStaticDataService {
    constructor() {
        this.cityRepository = cityRepository_1.CityRepository;
        this.countryRepository = countryRepository_1.CountryRepository;
        this.districtRepository = districtRepository_1.DistrictRepository;
        this.typeArticleRepository = typeArticleRepository_1.TypeArticleRepository;
        this.typeStoreRepository = typeStoreRepository_1.TypeStoreRepository;
        this.unitMeasureRepository = unitMeasureRepository_1.UnitMeasureRepository;
    }
    getListCity(cityId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cities = yield this.cityRepository.getListCity(cityId);
                return {
                    status: 200,
                    response_data: cities
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getListCountry(countryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const countries = yield this.countryRepository.getListCountry(countryId);
                return {
                    status: 200,
                    response_data: countries
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getListDistrict(districtId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const districts = yield this.districtRepository.getListDistrict(districtId);
                return {
                    status: 200,
                    response_data: districts
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getListTypeArticle(typeArticleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const typeArticles = yield this.typeArticleRepository.getListTypeArticle(typeArticleId);
                return {
                    status: 200,
                    response_data: typeArticles
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getListTypeStore(typeStoreId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const typeStores = yield this.typeStoreRepository.getListTypeStore(typeStoreId);
                return {
                    status: 200,
                    response_data: typeStores
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    getListUnitMeasure(unitMeasureId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unitMeasures = yield this.unitMeasureRepository.getListUnitMeasure(unitMeasureId);
                return {
                    status: 200,
                    response_data: unitMeasures
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
}
exports.default = ApiStaticDataService;
