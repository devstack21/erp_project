import { Entity, PrimaryGeneratedColumn, Column, OneToMany,CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Store } from './store.models';

@Entity()
export class TypeStore {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    libelle!: string;

    @Column()
    description!:string

    @OneToMany(() => Store, store => store.typeStore)
    stores!: Store[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

}
