import { Module } from '@nestjs/common';
import { UserEntityModule } from '@root/src/model/user-entity/user-entity.module';
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module';

import { UserMapper } from './mapper'
import { UsuariosController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    UserEntityModule,
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
