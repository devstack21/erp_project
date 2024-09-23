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
exports.Client = void 0;
const typeorm_1 = require("typeorm");
const user_models_1 = require("./user.models");
const district_models_1 = require("./district.models");
const store_models_1 = require("./store.models");
let Client = class Client extends user_models_1.User {
};
exports.Client = Client;
__decorate([
    (0, typeorm_1.OneToMany)(() => store_models_1.Store, store => store.owner),
    __metadata("design:type", Array)
], Client.prototype, "stores", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_models_1.District, district => district.clients),
    __metadata("design:type", district_models_1.District)
], Client.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Client.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Client.prototype, "updatedAt", void 0);
exports.Client = Client = __decorate([
    (0, typeorm_1.ChildEntity)()
], Client);
