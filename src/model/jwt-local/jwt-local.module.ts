import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule} from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserEntityModule } from '@root/src/model/user-entity/user-entity.module'
import { RolesGuard } from '@shared/guard/roles.guard'
import { JwtAuthAccessTokenGuard } from '@shared/guard/jwt-auth.guard'
import { JwtStrategy } from '@root/src/model/jwt-local/jwt-strategy'

import { UserEntity } from 'src/entity/user.entity'
import { RefreshTokenEntity } from 'src/entity/refresh-token.entity'
import { UserMachinePropertyEntity } from 'src/entity/user-machine-property.entity'

import { JwtLocalModel } from './jwt-local.model'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity, 
            RefreshTokenEntity,
            UserMachinePropertyEntity
        ]),
        //forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '180000s'}//1800s->30min
            })
        }),
        ConfigModule,
        UserEntityModule
    ],
    controllers: [],
    providers: [
        JwtLocalModel, 
        RolesGuard, 
        JwtAuthAccessTokenGuard, 
        JwtStrategy
    ],
    exports: [JwtLocalModel]
})
export class JwtLocalModule {}