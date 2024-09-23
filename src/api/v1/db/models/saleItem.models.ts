
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,ManyToOne, UpdateDateColumn} from 'typeorm';
import { Article } from './article.models';
import { Sale } from './sale.models';

@Entity()
export class SaleItem{

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Sale, sale => sale.saleItems)
    sale!: Sale;

    @ManyToOne(() => Article)
    article!: Article;

    @Column('decimal')
    quantity!: number;

    @Column('decimal')
    price!: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}
