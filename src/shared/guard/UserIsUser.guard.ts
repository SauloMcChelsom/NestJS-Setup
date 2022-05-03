import { Injectable, CanActivate, Inject, forwardRef, ExecutionContext } from "@nestjs/common"
import { Observable } from "rxjs"

import { UserCommonModel } from "@model/user-common/user-common.model"
import { User } from "@shared/interfaces/user.interface"

@Injectable()
export class UserIsUserGuard implements CanActivate {

    constructor(@Inject(forwardRef(() => UserCommonModel)) private userModel: UserCommonModel) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        const params = request.params;
        const user: User = request.user;

        return this.userModel.findOneUserById(user.id).then(
            ((user: User) => {
                let hasPermission = false;
                
                if(user.id === Number(params.id)) {
                    hasPermission = true;
                }

                return user && hasPermission;                
            })
        )
    }

}