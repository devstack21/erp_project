import { Request, Response } from "express";
import ClientService from "../service/clientService";
import JwtService from "../service/jwtService";

class ClientControler {
    private clientService : ClientService
    constructor(clientService : ClientService){
        this.clientService = clientService
    }

    getClientConnected = async (request : Request, response : Response) =>{
        const token = request.headers['authorization'] && request.headers['authorization'].split(' ')[1]
        this.clientService.getClientIsConnected(token)
            .then((data) =>{response.json(data)})
            .catch((err)=>{return response.json(err)})
    }
}

export default new ClientControler(
    new ClientService(
        new JwtService()
    )
)