import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, TableInheritance,CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Client } from './client.models';
import { City } from './city.models';
import { Store } from './store.models';


@Entity()
export class District{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    code!: string

    @ManyToOne(() => City, city => city.districts, { onDelete: 'CASCADE' })
    city!: City;

    @OneToMany(() => Client, client => client.district)
    clients!: Client[] ;

    @OneToMany(() => Store, store => store.district)
    stores!: Store[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

}
