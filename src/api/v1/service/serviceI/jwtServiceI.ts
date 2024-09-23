import { Client } from "../../db/models/client.models";

export interface JwtServiceI {
    generateJwtToken : (client : Client) => string ;
    generateJwtTokenExpire : (userId : number) => string ;
    getUserJwtTokenDecrypt : (token : any) => Promise<Client | null> ; 
}