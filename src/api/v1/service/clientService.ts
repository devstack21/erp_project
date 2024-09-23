
import { ResponseHttp } from "../domain/http.domain";
import ExceptionHandler from "../handlerException/handlerException";
import { ClientRepository } from "../repository/clientRepository";
import JwtService from "./jwtService";

export default class ClientService {
    private readonly clientRepository = ClientRepository
    private jwtService : JwtService 
    constructor(jwtService : JwtService){
        this.jwtService = jwtService
    }
    async getClientIsConnected(token : any){
        try {
            const userTokenConnected = await this.jwtService.getUserJwtTokenDecrypt(token) 
            const clientConnected = await this.clientRepository.getClientConnected(userTokenConnected)
            return {
                status : 200,
                response_data : clientConnected
            } as ResponseHttp
        } catch (error) {
            return ExceptionHandler.handleError(error)
        }
    }
}