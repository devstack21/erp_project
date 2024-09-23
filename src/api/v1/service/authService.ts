
import { ClientRepository } from "../repository/clientRepository"
import { SignupDto } from "../dto/signup.dto"
import  { ResponseHttp } from "../domain/http.domain"
import dbInstance from "../db/ormconfig"
import {plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { ValidationException } from "../exception/validationException"
import ValidationErrorAuth from "../utils/validationError.auth"
import { LoginDto } from "../dto/login.dto"
import JwtService from "./jwtService"
import { ResponseHttpValidationException } from "../domain/http.domain"
import ExceptionHandler from "../handlerException/handlerException"
import { SignApp2FA } from "./serviceI/authServiceI/signI2FA"
import ClientService from "./clientService"

export default class AuthService implements SignApp2FA {
        private readonly clientRepository = ClientRepository
        private readonly validationErrorAuth : ValidationErrorAuth
        private readonly jwtService : JwtService
        private readonly clientService : ClientService
        constructor(
            validationErrorAuth : ValidationErrorAuth, jwtService : JwtService, clientService : ClientService
        ) { this.jwtService = jwtService
            this.validationErrorAuth = validationErrorAuth  
            this.clientService = clientService
        }
        async signup (data : SignupDto) : Promise<ResponseHttp | ResponseHttpValidationException> {
        try {
            const createClientDto = plainToClass(SignupDto, data);
            const errors = await validate(createClientDto);
            if (errors.length > 0) {
                const errorsValidation = this.validationErrorAuth.responseValidateError(errors);
                throw new ValidationException(errorsValidation, "Erreur de validation de l'utilisateur",'Validation signup error');
            } 
            const savedClient = await dbInstance.transaction(async (manager) => {
                const transactionalClientRepository = manager.withRepository(ClientRepository);
                return await transactionalClientRepository.createAndSaveClient(manager , data);
            });
            return {
                status : 201,
                message : 'Inscription réussie avec succès',
                id : savedClient.id
            } as ResponseHttp;
        } catch (error) {return ExceptionHandler.handleError(error)}      
        }
        async login (data : LoginDto) : Promise<ResponseHttp | ResponseHttpValidationException>{
            try {
            const createLoginDto = plainToClass(LoginDto, data);
            const errors = await validate(createLoginDto);
            if (errors.length > 0) {
                const errorsValidation = this.validationErrorAuth.responseValidateError(errors);
                throw new ValidationException(errorsValidation,"Erreur de validation de l'utilisateur", 'Validation login error');}
            const client = await this.clientRepository.checkAndGetClient(data)
            const token = this.jwtService.generateJwtToken(client)
            const clientConnected=  await this.clientService.getClientIsConnected(token)
            return {
                    status : 200 , 
                    message : "Connexion reussie avec succès",
                    token : token,
                    response_data : clientConnected
            } as ResponseHttp      
            } catch (error) {
            return ExceptionHandler.handleError(error)
            }
        }
        async logout (userId : number): Promise<ResponseHttp> {
            try {
                const tokenExpire = this.jwtService.generateJwtTokenExpire(userId)
                return {message : 'Deconnexion reussie',  status: 200, token : tokenExpire} as ResponseHttp
            } catch (error) {
                return ExceptionHandler.handleError(error)
            }  
        }
        paswwordForgetted = () =>{}
        loginWithGoogle = () =>{
        }
        loginWithFacebook = () =>{}
}