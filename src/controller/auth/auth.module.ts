import { Module } from '@nestjs/common'

import { JwtLocalModule } from '@root/src/model/jwt-local/jwt-local.module'
import { UserEntityModule } from '@root/src/model/user-entity/user-entity.module'

import { AuthMapper } from './mapper/index.mapper'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    imports: [
        JwtLocalModule,
        UserEntityModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        AuthMapper
    ],
    exports: [AuthService]
})
export class AuthModule {}
