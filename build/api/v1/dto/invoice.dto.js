"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceDto = void 0;
const class_validator_1 = require("class-validator");
const enum_cte_1 = require("../enum/enum.cte");
const class_validator_2 = require("class-validator");
const status_constraint_1 = require("../constraint/invoice.constraints/status.constraint");
class InvoiceDto {
}
exports.InvoiceDto = InvoiceDto;
__decorate([
    (0, class_validator_1.IsPositive)({ message: "Total amount invoice must be positive" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Total amount invoice must not be empty" }),
    __metadata("design:type", Number)
], InvoiceDto.prototype, "totalAmount", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: "Sale items must be a array" }),
    __metadata("design:type", Array)
], InvoiceDto.prototype, "saleItems", void 0);
__decorate([
    (0, class_validator_2.Validate)(status_constraint_1.StatusInvoiceValidate, {
        message: 'Status invoice not define'
    }),
    __metadata("design:type", String)
], InvoiceDto.prototype, "status", void 0);
