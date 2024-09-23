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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeRepository = void 0;
const type_models_1 = require("../db/models/type.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
exports.TypeRepository = ormconfig_1.default.getRepository(type_models_1.TypeUser).extend({
    findByLibelleType(libelle) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield this.findOne({ where: { libelle } });
            return type ? type : undefined;
        });
    },
    registerClient(type, client) {
        if (type.users) {
            type.users.push(client);
        }
        else {
            type.users = [client];
        }
    }
});
