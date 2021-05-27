
import { PayTransaction } from 'src/modules/payment/paymentSchema/paytransaction';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToMany, JoinTable, OneToMany, ManyToOne, Unique, OneToOne} from 'typeorm';

@Entity()

export class Order {
    @PrimaryGeneratedColumn()
    id: number;
}
