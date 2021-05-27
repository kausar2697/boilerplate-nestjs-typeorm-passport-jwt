
import { IsDefined, isEmail, IsNotEmpty } from 'class-validator';
import { Seller } from 'src/modules/sellers/entities/seller.entity';
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator";
import { StringDecoder } from 'string_decoder';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToMany, OneToMany, ManyToOne, BeforeInsert, Unique, Index, JoinTable } from 'typeorm';
import { Order } from 'src/modules/order/orderSchema/order.entity';
import { PayTransaction } from 'src/modules/payment/paymentSchema/paytransaction';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { UserPermission } from 'src/modules/user-permission/entities/user-permission.entity';
import { User } from './user.entity';
@Entity()
export class UserVsSellerVsRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userSellerRole)
  user: User;

  @ManyToOne(() => Seller, seller => seller.userSellerRole)
  seller: Seller;

  @ManyToOne(() => UserRole, role => role.userSellerRole)
  role: UserRole;

}