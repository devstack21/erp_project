import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, TableInheritance,CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Store } from './store.models';
import { TypeArticle } from './type.article.models';
import { UnitMeasure } from './unitMeasure.models';
import { Supplier } from './supplier.models';


@Entity()
export class Article{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    code!: string 

    @Column('decimal')
    selling_price!:number 

    @Column('decimal')
    purchase_price!:number

    @Column()
    quantity!:number

    @ManyToOne(() => Store, store => store.articles)
    store!: Store;

    @ManyToOne(() => TypeArticle, typeArticle => typeArticle.articles)
    typeArticle!: TypeArticle;

    @ManyToOne(() => UnitMeasure, unitMeasure => unitMeasure.articles)
    unitMeasure!: UnitMeasure;

    @ManyToOne(() => Supplier, supplier=> supplier.articles)
    supplier!: Supplier;


    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

}
