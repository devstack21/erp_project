"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationStoreException_1 = require("../exception/validationStoreException");
class ValidationErrorStore {
    responseValidateError(errors) {
        const msg = {};
        const errorMessages = ['name', 'typeStore', 'districtName'];
        errors.forEach((error) => {
            const property = error.property;
            if (errorMessages.includes(property)) {
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            }
            else
                throw new validationStoreException_1.ValidationStoreException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
        return msg;
    }
}
exports.default = ValidationErrorStore;
