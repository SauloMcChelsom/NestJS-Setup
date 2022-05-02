import { Module } from '@nestjs/common'

import { JwtLocalModule } from '@root/src/model/jwt-local/jwt-local.module'
import { UsersModule } from '@root/src/model/user-common/user-common.module'

import { AuthMapper } from './mapper/index.mapper'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    imports: [
        JwtLocalModule,
        UsersModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        AuthMapper
    ],
    exports: [AuthService]
})
export class AuthModule {}
