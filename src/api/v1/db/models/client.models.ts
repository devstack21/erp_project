import { ChildEntity, Column,CreateDateColumn, ManyToOne , OneToMany,UpdateDateColumn } from 'typeorm';
import { User } from './user.models';
import { District } from './district.models';
import { Store } from './store.models';

@ChildEntity()
export class Client extends User {
    
    @OneToMany(() => Store, store => store.owner)
    stores!: Store[];

    @ManyToOne(() =>District , district => district.clients)
    district!: District

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;


}
