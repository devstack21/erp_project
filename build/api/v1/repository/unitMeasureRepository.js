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
exports.UnitMeasureRepository = void 0;
const unitMeasure_models_1 = require("../db/models/unitMeasure.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const unit_mapper_1 = __importDefault(require("../mapper/unit.mapper"));
exports.UnitMeasureRepository = ormconfig_1.default.getRepository(unitMeasure_models_1.UnitMeasure).extend({
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const unit = yield this.findOne({ where: { code: code } });
            return unit ? unit : undefined;
        });
    },
    findByLibelle(libelle) {
        return __awaiter(this, void 0, void 0, function* () {
            const unit = yield this.findOne({ where: { libelle: libelle } });
            return unit ? unit : undefined;
        });
    },
    getListUnitMeasure(unitMeasureId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = this.createQueryBuilder('unitMeasure');
                if (unitMeasureId) {
                    const unit = yield this.findOne({ where: { id: unitMeasureId } });
                    if (!unit)
                        throw new domainException_1.DomainError("L'unité de mesure spécifiée n'existe pas", 400, '  Unit Measure', 'ID Unit Measure not found');
                    query = query.andWhere('unitMeasure.id = :unitMeasureId', { unitMeasureId });
                }
                const units = yield query.getMany();
                return unit_mapper_1.default.toDtoArray(units);
            }
            catch (error) {
                throw error;
            }
        });
    }
});
