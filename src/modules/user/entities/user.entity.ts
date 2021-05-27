
import { IsDefined, isEmail, IsNotEmpty } from 'class-validator';
import { Seller } from 'src/modules/sellers/entities/seller.entity';
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator";
import { StringDecoder } from 'string_decoder';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToMany, OneToMany, ManyToOne, BeforeInsert, Unique, Index, JoinTable } from 'typeorm';
import { Order } from 'src/modules/order/orderSchema/order.entity';
import { PayTransaction } from 'src/modules/payment/paymentSchema/paytransaction';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { UserPermission } from 'src/modules/user-permission/entities/user-permission.entity';
import { UserVsSellerVsRole } from './user_vs_seller_vs_role.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: "varchar", length: 50 })
  cellNo: string;

  @Column({ nullable: true, type: "varchar", length: 50 })
  @IsEmail()
  mail: string;

  @Column("simple-json", { nullable: true })
  avatar: { url: string, alt: string };

  @Column({ nullable: true, type: "varchar", length: 60 })
  fullName: string;

  @Column({ nullable: true, type: "varchar", length: 50 })
  username: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  password: string;

  @Column("simple-json", { nullable: true })
  addresses: string[];

  @Column({ nullable: true, type: "varchar", length: 50 })
  DOB: string;

  @Column({ nullable: true, type: "varchar", length: 20 })
  gender: string;

  @Column({ nullable: true, type: "varchar", length: 50 })
  nationality: string;

  @Column({ nullable: true, type: "int", width: 50 })
  otpCode: number;

  @Column({ nullable: true, type: "varchar", length: 50 })
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createdAt: Date;

  @Column({ nullable: true, type: "int", width: 50 })
  createdBy: number

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;

  @Column({ nullable: true, type: "int", width: 50 })
  updatedBy: number

  @OneToMany(type => UserVsSellerVsRole, userSellerRole => userSellerRole.user)
  userSellerRole: UserVsSellerVsRole[];

  @ManyToMany(() => UserPermission, userPermission => userPermission.users)
  @JoinTable({ name: 'user_vs_permission' })
  userPermission: UserPermission[];

}