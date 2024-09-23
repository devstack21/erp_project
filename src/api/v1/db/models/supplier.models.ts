import { Entity, PrimaryGeneratedColumn,ManyToOne, Column, OneToMany,CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Article } from './article.models';
import { Store } from './store.models';

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    phone!:string

    @ManyToOne(() => Store, store => store.suppliers)
    store!: Store;

    @OneToMany(() => Article, article => article.supplier)
    articles!: Article[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

}
