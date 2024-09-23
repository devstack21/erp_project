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
exports.ClientRepository = void 0;
const client_models_1 = require("../db/models/client.models");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const domainException_1 = require("../exception/domainException");
const auth401Exception_1 = require("../exception/auth401Exception");
const typeRepository_1 = require("./typeRepository");
const districtRepository_1 = require("./districtRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validationException_1 = require("../exception/validationException");
const clientConnect_mapper_1 = __importDefault(require("../mapper/clientConnect.mapper"));
const SALT = 16;
exports.ClientRepository = ormconfig_1.default.getRepository(client_models_1.Client).extend({
    findByClientName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder("client")
                .where("client.username = :username", { username })
                .orderBy()
                .getMany();
        });
    },
    findOneByClientName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder("client")
                .where("client.username = :username", { username })
                .getOne();
        });
    },
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder("client")
                .where("client.email = :email", { email })
                .orderBy()
                .getMany();
        });
    },
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createQueryBuilder("client")
                .where("client.email = :email", { email })
                .getOne();
        });
    },
    addOwnerStore(client, store) {
        if (client.stores) {
            client.stores.push(store);
        }
        else {
            client.stores = [store];
        }
    },
    createAndSaveClient(transactionalEntity, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clientExist = yield transactionalEntity.withRepository(this).findOneByClientName(data.username);
                if (clientExist)
                    throw new auth401Exception_1.Auth401Exception('Le client existe déja', 'User not found');
                const client = new client_models_1.Client();
                const type = yield transactionalEntity.withRepository(typeRepository_1.TypeRepository).findByLibelleType('CLIENT');
                if (!type)
                    throw new domainException_1.DomainError('Le type utilisateur introuvable', 500, 'Type User', 'Type user not found');
                const district = yield transactionalEntity.withRepository(districtRepository_1.DistrictRepository).findByName(data.districtName);
                if (!district)
                    throw new domainException_1.DomainError('Ce quartier est introuvable', 500, 'Type User', 'district not found');
                const salt = bcrypt_1.default.genSaltSync(SALT), pwdHashed = bcrypt_1.default.hashSync(data.pwd, salt);
                // add properties client
                client.username = data.username;
                client.email = data.email;
                client.type = type;
                client.district = district;
                client.passwordHashed = pwdHashed;
                client.salt = salt;
                client.phone = data.phone;
                // save client 
                const userSaved = yield transactionalEntity.withRepository(this).save(client)
                    .catch((error) => {
                    console.error(error);
                    throw new validationException_1.AppError(`Echec de création du client ${data.username}`, 400);
                });
                //push type client 
                transactionalEntity.withRepository(typeRepository_1.TypeRepository).registerClient(type, userSaved);
                return userSaved;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    },
    checkAndGetClient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let client = yield this.findOneByEmail(data.email);
                if (!client)
                    throw new auth401Exception_1.Auth401Exception("Cet email n'existe pas", 'User mail not found');
                const matchPwdBD = bcrypt_1.default.hashSync(data.pwd, client.salt) == client.passwordHashed;
                if (!matchPwdBD)
                    throw new auth401Exception_1.Auth401Exception("Ce mot de passe n'existe pas", "User password not found");
                return client;
            }
            catch (error) {
                throw error;
            }
        });
    },
    getClientConnected(clientConnected) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!clientConnected)
                    throw new auth401Exception_1.Auth401Exception("Le client n'existe pas ", 'User not found');
                const clientId = clientConnected.id;
                let query = this.createQueryBuilder('client')
                    .leftJoinAndSelect('client.stores', 'store')
                    .leftJoinAndSelect('store.typeStore', 'typeStore')
                    .leftJoinAndSelect('store.district', 'district')
                    .where('client.id = :clientId', { clientId });
                const client = yield query.getOne();
                if (!client)
                    throw new auth401Exception_1.Auth401Exception("Cet utilisateur n'existe pas", 'User ID fake account');
                return clientConnect_mapper_1.default.toDto(client);
            }
            catch (error) {
                throw error;
            }
        });
    }
});
