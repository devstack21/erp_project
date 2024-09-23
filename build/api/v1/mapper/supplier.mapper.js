"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const supplier_dto_1 = require("../dto/supplier.dto");
class SupplierMapper {
    toDto(supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplierDto = new supplier_dto_1.SupplierDto;
            supplierDto.id = supplier.id;
            supplierDto.name = supplier.name;
            supplierDto.phone = supplier.phone;
            return supplierDto;
        });
    }
    toDtoArray(suppliers) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(suppliers.map(supplier => this.toDto(supplier)));
        });
    }
}
exports.default = new SupplierMapper();
