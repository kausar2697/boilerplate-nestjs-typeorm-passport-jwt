import { Order } from "src/modules/order/orderSchema/order.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PayTransaction {
    @PrimaryGeneratedColumn()
    id: number;
}
