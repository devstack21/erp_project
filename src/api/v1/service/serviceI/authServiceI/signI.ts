import {Request , Response} from 'express'
import { SignupDto} from '../../../dto/signup.dto'
import { LoginDto } from '../../../dto/login.dto'
import { ResponseHttp } from '../../../domain/http.domain'

export interface SignApp {

    signup : (data : SignupDto) => Promise<ResponseHttp> ,

    login : (data : LoginDto) =>  Promise<ResponseHttp> ,

    logout : (userId : number) => Promise<ResponseHttp>,

    paswwordForgetted : () => void,
}