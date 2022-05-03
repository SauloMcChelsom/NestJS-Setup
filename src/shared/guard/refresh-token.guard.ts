import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";

import { JwtLocalModel } from "@model/jwt-local/jwt-local.model"
import { User } from "@shared/interfaces/user.interface";

@Injectable()
export class JwtAuthRefreshTokenGuard implements CanActivate {
    constructor(@Inject(forwardRef(() => JwtLocalModel)) private jwtLocalModel: JwtLocalModel) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        await this.jwtLocalModel.validarRefreshToken(user.id)
        return true;
    }
}