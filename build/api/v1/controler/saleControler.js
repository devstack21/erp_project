"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const saleService_1 = __importDefault(require("../service/saleService"));
const validationError_saleItem_1 = __importDefault(require("../utils/validationError.saleItem"));
class SaleControler {
    constructor(saleService) {
        this.createSale = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant de la boutique n'est pas defini" });
            const saleItems = request.body.saleItems;
            if (saleItems.length == 0)
                response.json({ status: 400, message: "Envoyez au moins une ligne de vente " });
            this.saleService.createSale(saleItems, storeId)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getDataSaleStoreThisDay = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant de la boutique n'est pas defini" });
            const sale = request.query.sale ? parseInt(request.query.sale, 10) : 0;
            this.saleService.getSaleStoreThisDay(storeId, sale)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.getDataSaleByStore = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant de la boutique n'est pas defini" });
            const sale = request.query.sale ? parseInt(request.query.sale, 10) : 0;
            this.saleService.getSaleByStore(storeId, sale)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.saleService = saleService;
    }
}
exports.default = new SaleControler(new saleService_1.default(new validationError_saleItem_1.default()));
