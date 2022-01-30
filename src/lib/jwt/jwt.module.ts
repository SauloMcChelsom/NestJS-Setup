import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtUtilityService } from './jwt.service'
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: '3600s',
    },
  }),],
  providers: [JwtUtilityService],
  exports: [JwtUtilityService]
})
export class JwtUtilityModule {}
