import { Entity, PrimaryGeneratedColumn, Column, OneToMany,CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Article } from './article.models';

@Entity()
export class UnitMeasure {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    libelle!: string;

    @Column()
    code!:string

    @OneToMany(() => Article, article => article.unitMeasure)
    articles!: Article[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

}
