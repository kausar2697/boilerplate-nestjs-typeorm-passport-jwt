import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserRole } from "src/modules/user-role/entities/user-role.entity";
import { UserService } from "src/modules/user/users.service";
import { User } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const hasRole = () => roles.indexOf(user.role) > -1;
        console.log("request=========",request.permissionList)
        if (hasRole()) {
            let hasPermission: boolean = false;

            if (hasRole()) {
                hasPermission = true;
            };
            return user && hasPermission;

            // map((user: User) => {
            //     const hasRole = () => roles.indexOf(user.role) > -1;
            //     let hasPermission: boolean = false;

            //     if (hasRole()) {
            //         hasPermission = true;
            //     };
            //     return user && hasPermission;
            // })
        }
    }
}