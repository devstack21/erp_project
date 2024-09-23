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
exports.UnitMeasurerDto = void 0;
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
class UnitMeasurerDto {
}
exports.UnitMeasurerDto = UnitMeasurerDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "name must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Unit measure must not be empty" }),
    (0, class_validator_2.Matches)(/^[\p{L}\p{M}0-9 _'.\-]+$/u, {
        message: 'libelle can only contain letters, numbers, underscores, dashes, spaces, apostrophes, and periods'
    }),
    __metadata("design:type", String)
], UnitMeasurerDto.prototype, "libelle", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "code be not empty " }),
    (0, class_validator_2.Matches)(/^[\p{L}\p{M}0-9 _-]+$/u, {
        message: 'unit measure code can only contain letters, numbers, underscores, dashes, and spaces'
    }),
    __metadata("design:type", String)
], UnitMeasurerDto.prototype, "code", void 0);
