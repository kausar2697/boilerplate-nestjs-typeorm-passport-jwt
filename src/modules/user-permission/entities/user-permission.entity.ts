import { User } from "src/modules/user/entities/user.entity";
import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Entity } from "typeorm";
import { UserRole } from "../../user-role/entities/user-role.entity";


@Entity()
export class UserPermission{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true ,type: "varchar", length: 50})
    title: string;
   
    @Column({ nullable: true ,type: "varchar", length: 50})
    status: string;

    @Column({ nullable: true ,type: "int", width: 50})
    updatedBy: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP',nullable: true})
    updatedAt: Date;

    @Column({ nullable: true ,type: "int", width: 50})
    createdBy: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP',nullable: true})
    createdAt: Date;

    @ManyToMany(() => User, user => user.userPermission)
    users: User[];

    @ManyToMany(() => UserRole, userRole => userRole.userPermission)
    userRole: UserRole[];
}

