import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorModule } from '@root/src/controller/author/author.module';
import { UserModule } from '@root/src/controller/user/user.module'

import { UserEntity } from '@entity/user.entity';
import { RefreshTokenEntity } from '@entity/refresh-token.entity';

import { RoleModel } from './role.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    AuthorModule,
    UserModule
  ],
  providers: [
    RoleModel
  ],
  controllers: [],
  exports: [RoleModel]
})
export class RolesModule {}
