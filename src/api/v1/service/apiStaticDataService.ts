import ExceptionHandler from "../handlerException/handlerException";
import { CityRepository } from "../repository/cityRepository";
import { ResponseHttp } from "../domain/http.domain";
import { CountryRepository } from "../repository/countryRepository";
import { DistrictRepository } from "../repository/districtRepository";
import { TypeArticleRepository } from "../repository/typeArticleRepository";
import { TypeStoreRepository } from "../repository/typeStoreRepository";
import { UnitMeasureRepository } from "../repository/unitMeasureRepository";
import { ApiStaticDataServiceI } from "./serviceI/apiStaticDataServiceI";

export default class ApiStaticDataService implements ApiStaticDataServiceI {
    private readonly cityRepository = CityRepository
    private readonly countryRepository = CountryRepository
    private readonly districtRepository = DistrictRepository
    private readonly typeArticleRepository = TypeArticleRepository
    private readonly typeStoreRepository = TypeStoreRepository
    private readonly unitMeasureRepository = UnitMeasureRepository
    async getListCity (cityId : number) {
        try {
            const cities = await this.cityRepository.getListCity(cityId)
            return {
                status : 200,
                response_data : cities
             } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async getListCountry (countryId : number) {
        try {
            const countries = await this.countryRepository.getListCountry(countryId)
            return {
                status : 200,
                response_data : countries
             } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async getListDistrict (districtId : number) {
        try {
            const districts = await this.districtRepository.getListDistrict(districtId)
            return {
                status : 200,
                response_data : districts
             } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async getListTypeArticle (typeArticleId : number) {
        try {
            const typeArticles = await this.typeArticleRepository.getListTypeArticle(typeArticleId)
            return {
                status : 200,
                response_data : typeArticles
             } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async getListTypeStore (typeStoreId : number) {
        try {
            const typeStores = await this.typeStoreRepository.getListTypeStore(typeStoreId)
            return {
                status : 200,
                response_data : typeStores
             } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
    async getListUnitMeasure (unitMeasureId : number) {
        try {
            const unitMeasures = await this.unitMeasureRepository.getListUnitMeasure(unitMeasureId)
            return {
                status : 200,
                response_data : unitMeasures
             } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
}