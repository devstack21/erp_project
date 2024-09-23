
import { Entity, PrimaryGeneratedColumn,ManyToOne, Column,CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Sale } from './sale.models';
import { InvoiceTransactionStatus } from '../../enum/enum.cte';

@Entity()
export class Invoice{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('decimal')
    totalAmount!: number;

    @Column({
        type: 'enum',
        enum: InvoiceTransactionStatus,
        default: InvoiceTransactionStatus.PENDING
    })
    status!: InvoiceTransactionStatus

    @ManyToOne(() => Sale, sale => sale.invoices)
    sale!: Sale;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}
