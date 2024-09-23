
import { Client } from '../db/models/client.models';
import { TypeUser } from '../db/models/type.models';
import dbInstance from '../db/ormconfig';
export const TypeRepository = dbInstance.getRepository(TypeUser).extend({
    async findByLibelleType(libelle: string): Promise<TypeUser| undefined> {
        const type = await this.findOne({where : {libelle}})
        return type ? type : undefined
          
    },
    registerClient(type : TypeUser , client : Client){
        if (type.users) {
            type.users.push(client);
        } else {
            type.users = [client];
        }
    }
})

