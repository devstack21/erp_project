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
const clientRepository_1 = require("../repository/clientRepository");
const signup_dto_1 = require("../dto/signup.dto");
const ormconfig_1 = __importDefault(require("../db/ormconfig"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validationException_1 = require("../exception/validationException");
const login_dto_1 = require("../dto/login.dto");
const handlerException_1 = __importDefault(require("../handlerException/handlerException"));
class AuthService {
    constructor(validationErrorAuth, jwtService, clientService) {
        this.clientRepository = clientRepository_1.ClientRepository;
        this.paswwordForgetted = () => { };
        this.loginWithGoogle = () => {
        };
        this.loginWithFacebook = () => { };
        this.jwtService = jwtService;
        this.validationErrorAuth = validationErrorAuth;
        this.clientService = clientService;
    }
    signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createClientDto = (0, class_transformer_1.plainToClass)(signup_dto_1.SignupDto, data);
                const errors = yield (0, class_validator_1.validate)(createClientDto);
                if (errors.length > 0) {
                    const errorsValidation = this.validationErrorAuth.responseValidateError(errors);
                    throw new validationException_1.ValidationException(errorsValidation, "Erreur de validation de l'utilisateur", 'Validation signup error');
                }
                const savedClient = yield ormconfig_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                    const transactionalClientRepository = manager.withRepository(clientRepository_1.ClientRepository);
                    return yield transactionalClientRepository.createAndSaveClient(manager, data);
                }));
                return {
                    status: 201,
                    message: 'Inscription réussie avec succès',
                    id: savedClient.id
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createLoginDto = (0, class_transformer_1.plainToClass)(login_dto_1.LoginDto, data);
                const errors = yield (0, class_validator_1.validate)(createLoginDto);
                if (errors.length > 0) {
                    const errorsValidation = this.validationErrorAuth.responseValidateError(errors);
                    throw new validationException_1.ValidationException(errorsValidation, "Erreur de validation de l'utilisateur", 'Validation login error');
                }
                const client = yield this.clientRepository.checkAndGetClient(data);
                const token = this.jwtService.generateJwtToken(client);
                const clientConnected = yield this.clientService.getClientIsConnected(token);
                return {
                    status: 200,
                    message: "Connexion reussie avec succès",
                    token: token,
                    response_data: clientConnected
                };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
    logout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenExpire = this.jwtService.generateJwtTokenExpire(userId);
                return { message: 'Deconnexion reussie', status: 200, token: tokenExpire };
            }
            catch (error) {
                return handlerException_1.default.handleError(error);
            }
        });
    }
}
exports.default = AuthService;
