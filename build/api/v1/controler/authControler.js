"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../service/authService"));
const clientService_1 = __importDefault(require("../service/clientService"));
const validationError_auth_1 = __importDefault(require("../utils/validationError.auth"));
const class_transformer_1 = require("class-transformer");
const signup_dto_1 = require("../dto/signup.dto");
const jwtService_1 = __importDefault(require("../service/jwtService"));
const login_dto_1 = require("../dto/login.dto");
class AuthControler {
    constructor(authService) {
        this.signup = (request, response) => {
            const signupDto = (0, class_transformer_1.plainToClass)(signup_dto_1.SignupDto, request.body);
            this.authService.signup(signupDto)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.login = (request, response) => {
            const loginDto = (0, class_transformer_1.plainToClass)(login_dto_1.LoginDto, request.body);
            this.authService.login(loginDto)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.logout = (request, response) => {
            const userId = parseInt(request.params.id, 10);
            this.authService.logout(userId)
                .then((data) => { response.json(data); })
                .catch((err) => { return response.json(err); });
        };
        this.authService = authService;
    }
}
exports.default = new AuthControler(new authService_1.default(new validationError_auth_1.default(), new jwtService_1.default(), new clientService_1.default(new jwtService_1.default())));
