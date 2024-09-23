
import { Entity, PrimaryGeneratedColumn,ManyToOne,OneToMany, Column,CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { SaleItem } from './saleItem.models';
import { Invoice } from './invoice.models';
import { MethodPayment } from '../../enum/enum.cte';
import { Store } from './store.models';
@Entity()
export class Sale{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('decimal')
    totalAmount!: number;

    @ManyToOne(() => Store, store => store.sales)
    store!: Store;

    @Column({
        type: 'enum',
        enum: MethodPayment,
        default: MethodPayment.CASH
    })
    methodPayment!: MethodPayment 

    @OneToMany(() => SaleItem, saleLine => saleLine.sale)
    saleItems!: SaleItem[];

    @OneToMany(() => Invoice, invoice => invoice.sale)
    invoices!: Invoice[];
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}
