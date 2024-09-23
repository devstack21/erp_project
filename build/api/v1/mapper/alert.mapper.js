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
const alert_dto_1 = require("../dto/alert.dto");
class AlertMapper {
    toDto(alert) {
        return __awaiter(this, void 0, void 0, function* () {
            const alertDto = new alert_dto_1.AlertDto();
            alertDto.id = alert.id;
            alertDto.article = alert.article;
            alertDto.reason = alert.reason;
            return alertDto;
        });
    }
    toDtoArray(alerts) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(alerts.map(alert => this.toDto(alert)));
        });
    }
}
exports.default = new AlertMapper();
