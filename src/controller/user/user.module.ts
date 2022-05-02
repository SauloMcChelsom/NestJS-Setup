import { Module } from '@nestjs/common';
import { UsersModule } from '@model/users/user.module';
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module';

import { UserMapper } from './mapper'
import { UsuariosController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    UsersModule,
    JwtLocalModule
  ],
  controllers: [UsuariosController],
  providers: [
    UserService,
    UserMapper
  ],
  exports: [UserService],
})
export class UserModule {}
