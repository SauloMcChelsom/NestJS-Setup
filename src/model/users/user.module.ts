import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@entity/user.entity';

import { UserModel } from './user.model';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
  ],
  controllers: [],
  providers: [
    UserModel,
  ],
  exports: [UserModel],
})
export class UserModule {}
