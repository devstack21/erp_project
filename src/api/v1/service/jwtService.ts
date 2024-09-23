import { Client } from '../db/models/client.models';
import jwt from 'jsonwebtoken'
import { JwtErrorException } from '../exception/jwtException';
import { ClientRepository } from '../repository/clientRepository';
import { Auth401Exception } from '../exception/auth401Exception';
import { JwtServiceI } from './serviceI/jwtServiceI';

export default class JwtService implements JwtServiceI{
    private static TIME_MAX_TOKEN_IS_ACTIVE : number = 60*60*24*15
    private readonly clientRepository = ClientRepository
    generateJwtToken = (client : Client ) : string => {
        return jwt.sign({id : client.id} , process.env.KEY_TOKEN_DECRYPT as string, 
            {expiresIn : JwtService.TIME_MAX_TOKEN_IS_ACTIVE})
    }
    generateJwtTokenExpire = (userId : number ) : string =>{
        return jwt.sign({id : userId} , process.env.KEY_TOKEN_DECRYPT as string, 
            {expiresIn : '1s'})
    }
    getUserJwtTokenDecrypt = async (token : any) : Promise<Client | null> =>{
        
        try {
            if (!token) throw new JwtErrorException("Token non valide", 'Token not valid');
            
            const decryptedToken: any = jwt.verify(token, process.env.KEY_TOKEN_DECRYPT as string);
            const userId = decryptedToken.id;
            const client = await this.clientRepository.findOne({ where: { id: userId } });
            if (!client) throw new Auth401Exception("Cet utilisateur n'existe pas", "User token not found")
            return client
        } catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {  
                throw new JwtErrorException("Le token a expiré ou est invalide", 'Token expired or invalid');
            }
            throw err;
        }
    }
}  