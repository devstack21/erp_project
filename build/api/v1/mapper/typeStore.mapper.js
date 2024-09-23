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
const typeStore_dto_1 = require("../dto/typeStore.dto");
class TypeStoreMapper {
    toDto(typeStore) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeStoreDto = new typeStore_dto_1.TypeStoreDto();
            typeStoreDto.id = typeStore.id;
            typeStoreDto.libelle = typeStore.libelle;
            typeStoreDto.description = typeStore.description;
            return typeStoreDto;
        });
    }
    toDtoArray(typeStores) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(typeStores.map(typeStore => this.toDto(typeStore)));
        });
    }
}
exports.default = new TypeStoreMapper();
