import { User } from "src/modules/user/entities/user.entity";
import { UserVsSellerVsRole } from "src/modules/user/entities/user_vs_seller_vs_role.entity";
import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Entity, OneToMany } from "typeorm";
import { UserPermission } from "../../user-permission/entities/user-permission.entity";


@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: "varchar", length: 50 })
    title: string;

    @Column({ nullable: true, type: "varchar", length: 50 })
    status: string;

    @Column({ nullable: true, type: "int", width: 50 })
    updatedBy: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date;

    @Column({ nullable: true, type: "int", width: 50 })
    createdBy: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    createdAt: Date;

    @OneToMany(type => UserVsSellerVsRole, userSellerRole => userSellerRole.role)
    userSellerRole: UserVsSellerVsRole[];

    @ManyToMany(() => UserPermission, userPermission => userPermission.userRole)
    @JoinTable({name: 'user_role_vs_permission'})
    userPermission: UserPermission[];
}

 