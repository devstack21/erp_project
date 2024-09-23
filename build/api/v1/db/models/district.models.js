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
exports.District = void 0;
const typeorm_1 = require("typeorm");
const client_models_1 = require("./client.models");
const city_models_1 = require("./city.models");
const store_models_1 = require("./store.models");
let District = class District {
};
exports.District = District;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], District.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], District.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], District.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_models_1.City, city => city.districts, { onDelete: 'CASCADE' }),
    __metadata("design:type", city_models_1.City)
], District.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => client_models_1.Client, client => client.district),
    __metadata("design:type", Array)
], District.prototype, "clients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_models_1.Store, store => store.district),
    __metadata("design:type", Array)
], District.prototype, "stores", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], District.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], District.prototype, "updatedAt", void 0);
exports.District = District = __decorate([
    (0, typeorm_1.Entity)()
], District);
