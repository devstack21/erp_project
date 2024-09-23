
import { Client } from '../db/models/client.models';
import dbInstance from '../db/ormconfig';
import { DomainError } from '../exception/domainException';
import { Auth401Exception } from '../exception/auth401Exception';
import { TypeRepository } from './typeRepository';
import { DistrictRepository } from './districtRepository';
import crypt from 'bcrypt'
import { AppError } from '../exception/validationException';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { Store } from '../db/models/store.models';
import { EntityManager } from 'typeorm';
import clientConnectMapper from '../mapper/clientConnect.mapper';

const SALT =  16 

export const ClientRepository = dbInstance.getRepository(Client).extend({

    async findByClientName(username: string): Promise<Array<Client> | []> {
        return this.createQueryBuilder("client")
            .where("client.username = :username", { username })
            .orderBy()
            .getMany()     
    },

    async findOneByClientName(username :string) : Promise<Client | null> {
        return this.createQueryBuilder("client")
            .where("client.username = :username", { username })
            .getOne() 
    },

    async findByEmail(email : string) : Promise<Array<Client> | []> {
        return this.createQueryBuilder("client")
            .where("client.email = :email", { email})
            .orderBy()
            .getMany() 
      
    },
    async findOneByEmail(email :string) : Promise<Client | null> {
        return this.createQueryBuilder("client")
            .where("client.email = :email", { email })
            .getOne() 
    },

    addOwnerStore(client : Client , store : Store){
        if (client.stores) {
            client.stores.push(store);
        } else {
            client.stores = [store];
        }
    },
    async createAndSaveClient(transactionalEntity : EntityManager, data : SignupDto )  {

        try {
            let clientExist = await transactionalEntity.withRepository(this).findOneByClientName(data.username)
            if(clientExist) throw new Auth401Exception('Le client existe déja', 'User not found')
        
            const client = new Client()

            const type = await transactionalEntity.withRepository(TypeRepository).findByLibelleType('CLIENT')
            if(!type)  throw new DomainError('Le type utilisateur introuvable', 500,'Type User', 'Type user not found')

            const district = await transactionalEntity.withRepository(DistrictRepository).findByName(data.districtName)
            if(!district)  throw new DomainError('Ce quartier est introuvable', 500,'Type User', 'district not found')
            
            const salt = crypt.genSaltSync(SALT) , pwdHashed =  crypt.hashSync(data.pwd,salt)

            // add properties client
            client.username = data.username
            client.email = data.email 
            client.type = type
            client.district = district
            client.passwordHashed = pwdHashed
            client.salt = salt 
            client.phone = data.phone
            
            // save client 
            const userSaved=  await transactionalEntity.withRepository(this).save(client)
            .catch((error)=>{
                console.error(error)
                throw new AppError(`Echec de création du client ${data.username}` , 400)
            })
            //push type client 
            transactionalEntity.withRepository(TypeRepository).registerClient(type , userSaved)
            return userSaved    
        } catch (error ) {
            console.error(error)
            throw error
        }
    },

    async checkAndGetClient(data : LoginDto) : Promise<Client>{
        try {
            let client = await this.findOneByEmail(data.email)
            if(!client) throw new Auth401Exception("Cet email n'existe pas", 'User mail not found')
            const matchPwdBD : Boolean = crypt.hashSync(data.pwd,client.salt) == client.passwordHashed 
            if(!matchPwdBD) throw new Auth401Exception("Ce mot de passe n'existe pas", "User password not found");
            return client
            
        } catch (error) {
            throw error
        }
        
        },
        async getClientConnected(clientConnected : Client | null){
            try {
                if(!clientConnected) throw new Auth401Exception("Le client n'existe pas ", 'User not found')
                const clientId = clientConnected.id
                let query = this.createQueryBuilder('client')
                                .leftJoinAndSelect('client.stores', 'store')
                                .leftJoinAndSelect('store.typeStore', 'typeStore')
                                .leftJoinAndSelect('store.district', 'district')
                                .where('client.id = :clientId', {clientId})
                const client =  await query.getOne() 
                if(!client) throw new Auth401Exception("Cet utilisateur n'existe pas", 'User ID fake account')
                return clientConnectMapper.toDto(client)        
            } catch (error) {
                throw error
            }
            

    }

})


