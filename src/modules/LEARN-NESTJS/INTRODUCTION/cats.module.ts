import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ 
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    })
  ],
  controllers: [CatsController],
  providers: [CatsService, JwtStrategy],
  exports: [CatsService]
})
export class CatsModule {}