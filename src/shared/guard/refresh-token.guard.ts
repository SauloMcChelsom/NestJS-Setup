import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { AuthorService } from "src/modules/author/author.service";
import { User } from "src/shared/interfaces/user.interface";

@Injectable()
export class ValidateRefreshTokenGuard implements CanActivate {
    constructor(@Inject(forwardRef(() => AuthorService)) private authService: AuthorService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        await this.authService.validarRefreshToken(user.id)
        return true;
    }
}