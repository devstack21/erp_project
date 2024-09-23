import express from 'express'
import AuthService from "../service/authService";
import ClientService from '../service/clientService';
import ValidationErrorAuth from "../utils/validationError.auth"
import { plainToClass } from "class-transformer";
import { SignupDto } from "../dto/signup.dto";
import JwtService from '../service/jwtService';
import { Response, Request } from "express";
import { LoginDto } from '../dto/login.dto';
import { AuthControlerI } from './controlerI/authControlerI';

class AuthControler implements AuthControlerI {

    private readonly authService : AuthService
    
    constructor(authService : AuthService){
        this.authService = authService    
    }

    signup = (request : express.Request, response : express.Response) => {
        const signupDto = plainToClass(SignupDto, request.body)
        this.authService.signup(signupDto)
        .then((data) =>{response.json(data)})
        .catch((err)=>{return response.json(err)})
    }
    login = (request : Request, response : Response) =>{
        const loginDto = plainToClass(LoginDto , request.body)
        this.authService.login(loginDto)
        .then((data) =>{response.json(data)})
        .catch((err)=>{return response.json(err)})
    }
    logout = (request : Request, response : Response) =>{
        const userId  = parseInt(request.params.id as string , 10)
        this.authService.logout(userId)
        .then((data) =>{response.json(data)})
        .catch((err)=>{return response.json(err)})
    }
}

export default new AuthControler(new AuthService(
    new ValidationErrorAuth(),
    new JwtService(),
    new ClientService(
        new JwtService()
    )
))

