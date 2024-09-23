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
exports.TypeUser = void 0;
const typeorm_1 = require("typeorm");
const user_models_1 = require("./user.models");
let TypeUser = class TypeUser {
};
exports.TypeUser = TypeUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TypeUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeUser.prototype, "libelle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TypeUser.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_models_1.User, user => user.type),
    __metadata("design:type", Array)
], TypeUser.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], TypeUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], TypeUser.prototype, "updatedAt", void 0);
exports.TypeUser = TypeUser = __decorate([
    (0, typeorm_1.Entity)()
], TypeUser);
