"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const alertStockService_1 = __importDefault(require("../service/alertStockService"));
class AlertStockControler {
    constructor(alertStockService) {
        this.getAlertStore = (request, response) => {
            const storeId = parseInt(request.params.storeId, 10);
            if (!storeId)
                return response.json({ status: 400, message: "L'identifiant de la boutique n'est pas defini" });
            const alert = request.query.alert ? parseInt(request.query.alert, 10) : 0;
            this.alertStockService.getAlertStore(storeId, alert)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.alertStockService = alertStockService;
    }
}
exports.default = new AlertStockControler(new alertStockService_1.default());
