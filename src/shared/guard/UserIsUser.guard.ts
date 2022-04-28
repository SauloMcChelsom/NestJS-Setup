import { Injectable, CanActivate, Inject, forwardRef, ExecutionContext } from "@nestjs/common"
import { Observable } from "rxjs"
import { UserService } from "src/modules/user/user.service"
import { User } from "src/shared/interfaces/user.interface"

@Injectable()
export class UserIsUserGuard implements CanActivate {

    constructor(@Inject(forwardRef(() => UserService)) private userService: UserService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        const params = request.params;
        const user: User = request.user;

        return this.userService.findOneUserById(user.id).then(
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