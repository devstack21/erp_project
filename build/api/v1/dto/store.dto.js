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
exports.StoreDto = void 0;
const class_validator_1 = require("class-validator");
const name_constraint_1 = require("../constraint/store.constraint/name.constraint");
const class_validator_2 = require("class-validator");
class StoreDto {
}
exports.StoreDto = StoreDto;
__decorate([
    (0, class_validator_2.Validate)(name_constraint_1.NameStoreUniqueValidate, {
        message: 'Name store exists already'
    }),
    (0, class_validator_1.IsString)({ message: "Store name must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Store name must not be empty" }),
    (0, class_validator_1.Matches)(/^[\p{L}\p{M}0-9 _'\-]+$/u, {
        message: 'Store name can only contain letters, numbers, underscores, dashes, and spaces'
    }),
    __metadata("design:type", String)
], StoreDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "District must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "District name must not be empty" }),
    (0, class_validator_1.Matches)(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'District name can only contain letters, numbers, underscores, dashes, and spaces'
    }),
    __metadata("design:type", String)
], StoreDto.prototype, "districtName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Libelle type store must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Libelle type store must not be empty" }),
    (0, class_validator_1.Matches)(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'Libelle type store can only contain letters, numbers, underscores, dashes, and spaces'
    }),
    __metadata("design:type", String)
], StoreDto.prototype, "typeStore", void 0);
