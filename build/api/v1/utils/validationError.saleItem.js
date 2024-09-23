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
const class_validator_1 = require("class-validator");
const saleItem_dto_1 = require("../dto/saleItem.dto");
const class_transformer_1 = require("class-transformer");
const validationSaleException_1 = require("../exception/validationSaleException");
class ValidationErrorSaleItem {
    responseValidateError(errors) {
        const msg = {};
        const errorMessages = ['article', 'quantity', 'price'];
        errors.forEach((error) => {
            const property = error.property;
            if (errorMessages.includes(property)) {
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            }
            else
                throw new validationSaleException_1.ValidationSaleException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
        return msg;
    }
    responseValidationSaleItems(saleLines) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const saleLine of saleLines) {
                const createSaleItemDto = (0, class_transformer_1.plainToClass)(saleItem_dto_1.SaleItemDto, saleLine);
                const errors = yield (0, class_validator_1.validate)(createSaleItemDto);
                if (errors.length > 0) {
                    const errorsValidation = this.responseValidateError(errors);
                    throw new validationSaleException_1.ValidationSaleException(errorsValidation, `erreur de validation de la ligne vente de l'article ${saleLine.article}`, `Validation sale item article ${saleLine.article}`);
                }
            }
        });
    }
}
exports.default = ValidationErrorSaleItem;
