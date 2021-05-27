import { StringDecoder } from 'string_decoder';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToMany, Unique, Index } from 'typeorm';
import { IsDefined, IsNotEmpty } from 'class-validator'
import { User } from 'src/modules/user/entities/user.entity';
import { UserVsSellerVsRole } from 'src/modules/user/entities/user_vs_seller_vs_role.entity';
import { TermValue } from 'src/modules/term/entities/termValue.entity';
import { Term } from 'src/modules/term/entities/term.entity';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: "varchar", length: 50 })
  @Index({ unique: true })
  shopId: string;

  @Column({ nullable: false, type: "varchar", length: 150 })
  @Index({ unique: true })
  shopTitle: string;

  @Column({ type: "varchar", length: 255 })
  slug: string;

  @Column({ nullable: true, type: "varchar", length: 50 })
  cellNo: string;

  @Column({ nullable: true, type: "varchar", length: 50 })
  mail: string;

  @Column({ nullable: true, type: "int", width: 50 })
  otpCode: number;

  @Column({ nullable: true, type: "varchar", length: 100 })
  address: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  shopType: string;

  @Column("simple-json", { nullable: true })
  avatar: { url: string, alt: string };

  @Column({ nullable: true, type: "varchar", length: 50 })
  status: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  bisOwner: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  bisLegalForm: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  bisAddress: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  bisCountry: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  bisPersonInchrg: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  bisRegNum: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  bisNidNo: string;

  @Column({ nullable: true, type: "int", width: 50 })
  bisDivision: number;

  @Column({ nullable: true, type: "int", width: 50 })
  bisCity: number;

  @Column({ nullable: true, type: "int", width: 50 })
  bisZone: number;

  @Column({ nullable: true, type: "varchar", length: 100 })
  bisIdType: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  accTitle: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  accNo: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  accBankName: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  accBranchName: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  accRoutingNo: string;

  @Column("simple-json", { nullable: true })
  nidFrontImg: { url: string, alt: string };

  @Column("simple-json", { nullable: true })
  nidBackImg: { url: string, alt: string };

  @Column("simple-json", { nullable: true })
  accCheckImg: { url: string, alt: string };

  @Column({ nullable: true, type: "varchar", length: 100 })
  nidVerificationStatus: string;

  @Column({ default: false })
  emailVarificationStatus: boolean;

  @Column({ default: false })
  cellVarificationStatus: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createdAt: Date;

  @Column({ nullable: true, type: "int", width: 50 })
  createdBy: number

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;

  @Column({ nullable: true, type: "int", width: 50 })
  updatedBy: number

  @OneToMany(type => UserVsSellerVsRole, userSellerRole => userSellerRole.seller)
  userSellerRole: UserVsSellerVsRole[];

  @OneToMany(type => TermValue, termValue => termValue.seller)
  termValues: TermValue[];

  @OneToMany(type => Term, term => term.seller)
  terms: TermValue[];


}