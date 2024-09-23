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
exports.AlertRepository = void 0;
const alert_models_1 = require("../db/models/alert.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const storeRepository_1 = require("./storeRepository");
const alert_mapper_1 = __importDefault(require("../mapper/alert.mapper"));
exports.AlertRepository = ormconfig_1.default.getRepository(alert_models_1.Alert).extend({
    createAlert(transactionalEntity, alertDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = new alert_models_1.Alert();
            alert.reason = alertDto.reason;
            alert.article = alertDto.article;
            return yield transactionalEntity.withRepository(this).save(alert);
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.findOne({ where: { id: id } });
            if (!alert)
                throw new domainException_1.DomainError("L'identifiant de cette alert n'existe pas", 400, 'Alert', 'ID alert not found');
            return alert;
        });
    },
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find();
        });
    },
    getAlertStore(storeId, alertId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield storeRepository_1.StoreRepository.findOne({ where: { id: storeId } });
                if (!store) {
                    throw new domainException_1.DomainError("Le store n'existe pas", 400, 'Store', 'store not found');
                }
                let query = this.createQueryBuilder('alert')
                    .where('alert.storeId = :storeId', { storeId });
                if (alertId) {
                    query = query.andWhere('alert.id = :alertId', { alertId });
                }
                const alerts = yield query.getMany();
                return alert_mapper_1.default.toDtoArray(alerts);
            }
            catch (error) {
                throw error;
            }
        });
    }
});
