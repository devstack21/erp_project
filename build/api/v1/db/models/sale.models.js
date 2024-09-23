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
exports.Sale = void 0;
const typeorm_1 = require("typeorm");
const saleItem_models_1 = require("./saleItem.models");
const invoice_models_1 = require("./invoice.models");
const enum_cte_1 = require("../../enum/enum.cte");
const store_models_1 = require("./store.models");
let Sale = class Sale {
};
exports.Sale = Sale;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sale.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Sale.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_models_1.Store, store => store.sales),
    __metadata("design:type", store_models_1.Store)
], Sale.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_cte_1.MethodPayment,
        default: enum_cte_1.MethodPayment.CASH
    }),
    __metadata("design:type", String)
], Sale.prototype, "methodPayment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => saleItem_models_1.SaleItem, saleLine => saleLine.sale),
    __metadata("design:type", Array)
], Sale.prototype, "saleItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_models_1.Invoice, invoice => invoice.sale),
    __metadata("design:type", Array)
], Sale.prototype, "invoices", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Sale.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Sale.prototype, "updatedAt", void 0);
exports.Sale = Sale = __decorate([
    (0, typeorm_1.Entity)()
], Sale);
