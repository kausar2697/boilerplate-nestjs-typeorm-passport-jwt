import { Seller } from 'src/modules/sellers/entities/seller.entity';
import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn, Unique, Index, CreateDateColumn, OneToMany, ManyToOne, JoinTable, ManyToMany, JoinColumn } from 'typeorm';
import { TermValue } from './termValue.entity';


@Entity()
export class Term {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "varchar", length: 100 })
    @Index({ unique: true })
    title: string;

    @Column({ type: "enum", enum: ["text", "single-choice", "multiple-choice"], nullable: false })
    type: string;

    @Column({ nullable: true, type: "text" })
    description: string;

    @Column({ default: true, nullable: false })
    isDynamic: boolean;

    @Column({ nullable: true, default: false })
    frontendVisibility: boolean;

    @Column({ nullable: true, default: false })
    required: boolean;

    @Column({ nullable: true, type: "varchar", length: 255 })
    toolTipText: string;

    @Column({ nullable: true, type: "int", width: 50 })
    updatedBy: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date;

    @Column({ nullable: true, type: "int", width: 50 })
    createdBy: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    createdAt: Date;

    //Many 2 Many relation with termValue
    @ManyToMany(() => TermValue, termValue => termValue.terms)
    @JoinTable({ name: "term_vs_termvalue" })
    termValues: TermValue[];

    @ManyToOne(type => Seller, seller => seller.terms)
    seller: Seller;

}



