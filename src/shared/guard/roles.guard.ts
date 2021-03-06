import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Observable } from "rxjs"

import { UserEntityModel } from "@root/src/model/user-entity/user-entity.model"
import { User } from "@shared/interfaces/user.interface"

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        @Inject(forwardRef(() => UserEntityModel))
        private userModel: UserEntityModel,

        private reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        
        if (!roles) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user: User = request.user

        return this.userModel.findOneUserById(user.id).then(
            ((user: User) => {
                const hasRole = () => roles.indexOf(user.role) > -1
                let hasPermission: boolean = false

                if (hasRole()) {
                    hasPermission = true
                }
                
                return user && hasPermission
            })
        )
    }
}