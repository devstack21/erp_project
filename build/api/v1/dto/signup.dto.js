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
exports.SignupDto = void 0;
const class_validator_1 = require("class-validator");
const mdp_constraint_1 = require("../constraint/signDto.constraint/mdp.constraint");
const email_constraints_1 = require("../constraint/signDto.constraint/email.constraints");
class SignupDto {
}
exports.SignupDto = SignupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    (0, class_validator_1.IsNotEmpty)({ message: "username must be not empty" }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]+$/, {
        message: 'Username can only contain letters, numbers, underscores, and dashes'
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.Validate)(email_constraints_1.EmailUniqueValidate, {
        message: 'email already exists'
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)({ message: "email must be not empty " }),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(9),
    (0, class_validator_1.IsNotEmpty)({ message: "phone must be not empty " }),
    __metadata("design:type", String)
], SignupDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.Validate)(mdp_constraint_1.PasswordValidate, {
        message: 'The password must contain a maximum of 8 characters , 1 number , 2 capital letters e',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "pwd must be not empty" }),
    __metadata("design:type", String)
], SignupDto.prototype, "pwd", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "district name must be not empty" }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]+$/, {
        message: 'Username can only contain letters, numbers, underscores, and dashes'
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "districtName", void 0);
