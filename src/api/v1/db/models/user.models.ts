import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance,CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TypeUser } from './type.models';


@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column({unique : true})
    email!: string;

    @Column()
    phone!: string ;

    @Column({default : false})
    mdpUpdated!: Boolean

    @Column({default : false})
    isActived!: Boolean

    @Column()
    passwordHashed!: string;

    @Column()
    salt!: string // key cryptographic
    
    @ManyToOne(() => TypeUser, typeUser => typeUser.users)
    type!: TypeUser;


    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;


}
