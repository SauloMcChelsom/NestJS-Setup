import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule} from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UserModule } from 'src/modules/user/user.module'
import { AuthModel } from 'src/modules/auth/auth.model'

import { RolesGuard } from '@shared/guard/roles.guard'
import { JwtAuthGuard } from '@shared/guard/jwt-guard'
import { JwtStrategy } from '@shared/guard/jwt-strategy'

import { UserEntity } from 'src/entity/user.entity'
import { RefreshTokenEntity } from 'src/entity/refresh-token.entity'
import { UserMachinePropertyEntity } from 'src/entity/user-machine-property.entity'

import { AuthMapper } from './mapper/auth.mapper'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity, 
            RefreshTokenEntity,
            UserMachinePropertyEntity
        ]),
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '1800s'}//1800s->30min
            })
        }),
        ConfigModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        RolesGuard, 
        JwtAuthGuard, 
        JwtStrategy,
        AuthModel,
        AuthMapper
    ],
    exports: [AuthService]
})
export class AuthModule {}
