import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Store } from './store.models';

@Entity()
export class Alert {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    reason!: string 

    @Column()
    article!:string

    @ManyToOne(() => Store, store=> store.alertes)
    store!: Store;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

}
