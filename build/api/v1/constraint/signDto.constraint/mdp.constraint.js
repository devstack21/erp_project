"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PasswordValidate_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidate = void 0;
const class_validator_1 = require("class-validator");
let PasswordValidate = PasswordValidate_1 = class PasswordValidate {
    validate(pwd, args) {
        return PasswordValidate_1.pwdRegex.test(pwd);
    }
    defaultMessage(args) {
        return 'The password must contain a maximum of 8 characters , 1 number , 2 capital letters e';
    }
};
exports.PasswordValidate = PasswordValidate;
PasswordValidate.pwdRegex = /^(?=.*[a-z])(?=.*[A-Z]{0,2})(?=.*[@_]{0,2})(?=.{8,})/;
exports.PasswordValidate = PasswordValidate = PasswordValidate_1 = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'passwordValidate', async: false })
], PasswordValidate);
