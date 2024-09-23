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
exports.TypeStore = void 0;
const typeorm_1 = require("typeorm");
const store_models_1 = require("./store.models");
let TypeStore = class TypeStore {
};
exports.TypeStore = TypeStore;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TypeStore.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeStore.prototype, "libelle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeStore.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_models_1.Store, store => store.typeStore),
    __metadata("design:type", Array)
], TypeStore.prototype, "stores", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], TypeStore.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], TypeStore.prototype, "updatedAt", void 0);
exports.TypeStore = TypeStore = __decorate([
    (0, typeorm_1.Entity)()
], TypeStore);
