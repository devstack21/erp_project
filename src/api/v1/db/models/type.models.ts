import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { User } from './user.models';

@Entity()
export class TypeUser {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    libelle!: string;

    @Column()
    code!: string ;

    @OneToMany(() => User, user => user.type)
    users!: User[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}
