import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, ManyToMany, JoinTable, OneToMany, ManyToOne, Unique } from 'typeorm';


@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: "varchar", length: 255 })
    key: string;

    @Column("simple-json", { nullable: true })
    values: string[];

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    createdAt: Date;

    @Column({ nullable: true, type: "int", width: 50 })
    createdBy: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date;

    @Column({ nullable: true, type: "int", width: 50 })
    updatedBy: number

}
