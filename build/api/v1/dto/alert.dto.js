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
exports.AlertDto = void 0;
const class_validator_1 = require("class-validator");
class AlertDto {
}
exports.AlertDto = AlertDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "Reason must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Reason must not be empty" }),
    (0, class_validator_1.Matches)(/^[\p{L}\p{M}0-9 _'\-]+$/u, {
        message: 'Reason can only contain letters, numbers, underscores, dashes, spaces, and apostrophes'
    }),
    __metadata("design:type", String)
], AlertDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Reason must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Reason must not be empty" }),
    __metadata("design:type", String)
], AlertDto.prototype, "article", void 0);
