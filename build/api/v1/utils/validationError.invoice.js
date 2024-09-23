"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationInvoiceRepository_1 = require("../exception/validationInvoiceRepository");
class ValidationErrorInvoice {
    responseValidateError(errors) {
        const msg = {};
        const errorMessages = ['totalAmount', 'status'];
        errors.forEach((error) => {
            const property = error.property;
            if (errorMessages.includes(property)) {
                const errorConstraints = error.constraints || {};
                const keyConstraintError = Object.keys(errorConstraints)[0];
                msg[property] = errorConstraints[keyConstraintError];
            }
            else
                throw new validationInvoiceRepository_1.ValidationInvoiceException({}, `La propriété ${property} n'est pas autorisé`, `property ${property} not define`);
        });
        return msg;
    }
}
exports.default = ValidationErrorInvoice;
