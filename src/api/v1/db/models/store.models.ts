import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany, TableInheritance,CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { District } from './district.models';
import { Client } from './client.models';
import { TypeStore } from './type.store.models';
import { Article } from './article.models';
import { Sale } from './sale.models';
import { AlertConfig } from '../../enum/enum.cte';
import { Alert } from './alert.models';
import { Supplier } from './supplier.models';
@Entity()
export class Store {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({
        type: 'enum',
        enum: AlertConfig,
        default: AlertConfig.DESACTIVED
    })
    alertConfig!: AlertConfig

    @ManyToOne(() => Client, client => client.stores)
    owner!: Client;

    @ManyToOne(() =>District , district => district.stores)
    district!: District

    @ManyToOne(() => TypeStore, typeStore => typeStore.stores)
    typeStore!: TypeStore;

    @OneToMany(() => Article, article => article.store)
    articles!: Article[];

    @OneToMany(() => Sale, sale => sale.store)
    sales!: Sale[];

    @OneToMany(() =>  Alert, alert => alert.store)
    alertes!: Alert[];

    @OneToMany(() => Supplier, supplier => supplier.store)
    suppliers!: Supplier[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}
