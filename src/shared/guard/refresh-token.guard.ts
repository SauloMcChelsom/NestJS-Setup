import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { User } from "src/shared/interfaces/user.interface";

@Injectable()
export class ValidateRefreshTokenGuard implements CanActivate {
    constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        await this.authService.validarRefreshToken(user.id)
        return true;
    }
}