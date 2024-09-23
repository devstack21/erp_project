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
const alertRepository_1 = require("../repository/alertRepository");
class AlertStockService {
    constructor() {
        this.alertRepository = alertRepository_1.AlertRepository;
    }
    getAlertStore(storeId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alerts = yield this.alertRepository.getAlertStore(storeId, alertId);
                return {
                    status: 200,
                    response_data: alerts
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
}
exports.default = AlertStockService;
