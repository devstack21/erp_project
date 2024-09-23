import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne , CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { District } from './district.models';
import { Country } from './country.model';

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    code!: string ;

    @ManyToOne(() => Country, country => country.cities, { onDelete: 'CASCADE' })
    country!: Country;

    @OneToMany(() => District, district => district.city)
    districts!: District[];
    
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

}
