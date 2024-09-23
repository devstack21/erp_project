"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationSupplierException_1 = require("../exception/validationSupplierException");
class ValidationErrorSupplier {
    responseValidateError(errors) {
        const msg = {};
        const errorMessages = ['name', 'phone'];
        errors.forEach((error) => {
            const property = error.property;
            if (errorMessages.includes(property)) {
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            }
            else
                throw new validationSupplierException_1.ValidationSupplierException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
        return msg;
    }
}
exports.default = ValidationErrorSupplier;
