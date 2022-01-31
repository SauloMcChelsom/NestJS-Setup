import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({      
      defaultStrategy: 'local' 
    }),
    JwtModule.registerAsync({
      imports: [ ConfigModule, ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '30d'),
        },
      })
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [
    AuthService, 
    JwtModule,
    PassportModule,
    UsersService
  ],
})
export class AuthModule {}
