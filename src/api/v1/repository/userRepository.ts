import { EntityRepository, Repository } from 'typeorm';
import { User } from '../db/models/user.models';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.findOne({where : {username}})
        if (!user) throw Error('User not found')
        return user 
      
    }

    async updateUserActivationStatus(userId: number, isActive: boolean): Promise<User | undefined> {
        const user = await this.findOne({where : {id : userId}});
        if (user) {
            user.isActived = isActive;
            return this.save(user);
        }
        return undefined;
    }

    async findByEmail(email : string) : Promise<User | undefined> {
        const user = await this.findOne({where : {email}})
        if (!user) throw Error('User not found')
        return user 
      
    }


}