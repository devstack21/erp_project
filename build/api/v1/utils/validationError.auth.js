"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationException_1 = require("../exception/validationException");
class ValidationErrorAuth {
    responseValidateError(errors) {
        const msg = {};
        const errorMessages = [
            'email',
            'phone',
            'username',
            'pwd',
            'districtName'
        ];
        errors.forEach((error) => {
            const property = error.property;
            if (errorMessages.includes(property)) {
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            }
            else
                throw new validationException_1.ValidationException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
        return msg;
    }
}
exports.default = ValidationErrorAuth;
