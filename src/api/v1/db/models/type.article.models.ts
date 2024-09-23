import { Entity, PrimaryGeneratedColumn, Column, OneToMany,CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Article } from './article.models';

@Entity()
export class TypeArticle {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    libelle!: string;

    @Column()
    description!:string

    @OneToMany(() => Article, article => article.typeArticle)
    articles!: Article[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

}
