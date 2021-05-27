import { Seller } from 'src/modules/sellers/entities/seller.entity';
import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, ManyToMany, JoinTable, DeleteDateColumn, Index } from 'typeorm';
import { Term } from './term.entity';

@Entity()
export class TermValue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "varchar", length: 150 })
    title: string;

    @Column({ name: "slug" })
    @Index({ unique: true })
    @Column({ nullable: false, type: "varchar", length: 50 })
    slug: string;

    @Column({ nullable: true, type: "text" })
    description: string;

    @Column({ nullable: true, type: "int", width: 50 })
    order: number;

    @Column({ type: "enum", enum: ["published", 'unuplished'] })
    status: string;

    @Column("simple-json", { nullable: true })
    images: {
        icon: { url: string, alt: string },
        image: { url: string, alt: string },
        banner: { url: string, alt: string }
    };

    @Column({ nullable: true, default: false })
    featured: boolean;

    @Column("simple-json", { nullable: true })
    metadata: {}

    @Column({ nullable: true, type: "int", width: 50 })
    updatedBy: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date;

    @Column({ nullable: true, type: "int", width: 50 })
    createdBy: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    createdAt: Date;

    @Column('simple-json', { nullable: true })
    parentTermValues: number[];

    @ManyToOne(type => TermValue, termValue => termValue.childTermValues)
    parentTermValue: TermValue;

    @OneToMany(type => TermValue, termValue => termValue.parentTermValue)
    childTermValues: TermValue[];

    @ManyToMany(() => Term, term => term.termValues)
    terms: Term[];

    @ManyToOne(type => Seller, seller => seller.termValues)
    seller: Seller;

}













