import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@entity/user.entity';

import { UserEntityModel } from './user-entity.model';
import { UserEntityRepository } from './user-entity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserEntityRepository]),
  ],
  controllers: [],
  providers: [
    UserEntityModel,
  ],
  exports: [UserEntityModel],
})
export class UserEntityModule {}
