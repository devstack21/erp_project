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
Object.defineProperty(exports, "__esModule", { value: true });
const alertRepository_1 = require("../repository/alertRepository");
const articleRepository_1 = require("../repository/articleRepository");
const alert_models_1 = require("../db/models/alert.models");
const AppException_1 = require("../exception/AppException");
const storeRepository_1 = require("../repository/storeRepository");
const domainException_1 = require("../exception/domainException");
class OutOfStockService {
    constructor() {
        this.alertRepository = alertRepository_1.AlertRepository;
        this.articleRepository = articleRepository_1.ArticleRepository;
    }
    checkingStockAlert(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store)
                    throw new domainException_1.DomainError("Le store n'existe pas", 404, 'Store', 'store not found');
                const articleStock = yield this.articleRepository.getArticle(storeId);
                // Filtrer les articles avec un stock nul
                const outOfStockArticles = articleStock.filter(article => article.quantity === 0);
                if (outOfStockArticles.length > 0) {
                    const alerts = outOfStockArticles.map(article => {
                        const alertStock = new alert_models_1.Alert();
                        alertStock.reason = `Out of stock of article ${article.name}`;
                        alertStock.article = article.name;
                        alertStock.store = store;
                        return alertStock;
                    });
                    //save alerts
                    yield this.alertRepository.save(alerts)
                        .then(() => {
                        // send sms or email 
                        console.log('ALERT GENERATED...');
                    })
                        .catch((error) => {
                        throw new AppException_1.AppException("Échec de la vérification des alertes de stock", 400, "APP_ERR_01", error.reason);
                    });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new OutOfStockService();
