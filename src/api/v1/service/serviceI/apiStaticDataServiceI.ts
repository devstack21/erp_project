import { ResponseHttp } from "../../domain/http.domain";
export interface ApiStaticDataServiceI {
    getListCity(cityId: number): Promise<ResponseHttp | {
        status: number;
        message: string;
    }>
    getListCountry(countryId: number): Promise<ResponseHttp | {
        status: number;
        message: string;
    }>
    getListDistrict(districtId: number): Promise<ResponseHttp | {
        status: number;
        message: string;
    }>

    getListTypeArticle(typeArticleId: number): Promise<ResponseHttp | {
        status: number;
        message: string;
    }>

    getListTypeStore(typeStoreId: number): Promise<ResponseHttp | {
        status: number;
        message: string;
    }>

    getListUnitMeasure(unitMeasureId: number): Promise<ResponseHttp | {
        status: number;
        message: string;
    }>

}