"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiStaticDataService_1 = __importDefault(require("../service/apiStaticDataService"));
class ApiStaticDataControler {
    constructor(apiStaticDataService) {
        this.getListCity = (request, response) => {
            const city = request.query.city ? parseInt(request.query.city, 10) : 0;
            this.apiStaticDataService.getListCity(city)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getListCountry = (request, response) => {
            const country = request.query.country ? parseInt(request.query.country, 10) : 0;
            this.apiStaticDataService.getListCountry(country)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getListDistrict = (request, response) => {
            const district = request.query.district ? parseInt(request.query.district, 10) : 0;
            this.apiStaticDataService.getListDistrict(district)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getListTypeArticle = (request, response) => {
            const typeArticle = request.query.type_article ? parseInt(request.query.type_article, 10) : 0;
            this.apiStaticDataService.getListTypeArticle(typeArticle)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getListTypeStore = (request, response) => {
            const typeStore = request.query.type_store ? parseInt(request.query.type_store, 10) : 0;
            this.apiStaticDataService.getListTypeStore(typeStore)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getListUnitMeasure = (request, response) => {
            const unit = request.query.unit ? parseInt(request.query.unit, 10) : 0;
            this.apiStaticDataService.getListUnitMeasure(unit)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.apiStaticDataService = apiStaticDataService;
    }
}
exports.default = new ApiStaticDataControler(new apiStaticDataService_1.default());
