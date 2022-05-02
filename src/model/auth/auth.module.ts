import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule} from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UserModule } from '@root/src/controller/user/user.module'

import { RolesGuard } from '@shared/guard/roles.guard'
import { JwtAuthGuard } from '@shared/guard/jwt-auth.guard'
import { JwtStrategy } from '@root/src/model/auth/jwt-strategy'

import { UserEntity } from 'src/entity/user.entity'
import { RefreshTokenEntity } from 'src/entity/refresh-token.entity'
import { UserMachinePropertyEntity } from 'src/entity/user-machine-property.entity'

import { AuthModel } from './auth.model'

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
        ConfigModule,
    ],
    controllers: [],
    providers: [
        AuthModel, 
        RolesGuard, 
        JwtAuthGuard, 
        JwtStrategy
    ],
    exports: [AuthModel]
})
export class AuthModule {}