"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationArticleException_1 = require("../exception/validationArticleException");
class ValidationErrorArticle {
    responseValidateError(errors) {
        const msg = {};
        const errorMessages = ['name',
            'code',
            'selling_price',
            'purchase_price',
            'quantity',
            'typeArticle',
            'categoryArticle',
            'unitMeasure',
            'supplier'];
        errors.forEach((error) => {
            const property = error.property;
            if (errorMessages.includes(property)) {
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            }
            else
                throw new validationArticleException_1.ValidationArticleException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
        return msg;
    }
}
exports.default = ValidationErrorArticle;
