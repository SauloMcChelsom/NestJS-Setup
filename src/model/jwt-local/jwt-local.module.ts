import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule} from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserCommonModule } from '@root/src/model/user-common/user-common.module'
import { RolesGuard } from '@shared/guard/roles.guard'
import { JwtAuthGuard } from '@shared/guard/jwt-auth.guard'
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
                signOptions: {expiresIn: '1800s'}//1800s->30min
            })
        }),
        ConfigModule,
        UserCommonModule
    ],
    controllers: [],
    providers: [
        JwtLocalModel, 
        RolesGuard, 
        JwtAuthGuard, 
        JwtStrategy
    ],
    exports: [JwtLocalModel]
})
export class JwtLocalModule {}