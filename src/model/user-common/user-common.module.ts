import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@entity/user.entity';

import { UserCommonModel } from './user-common.model';
import { UserRepository } from './user-common.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
  ],
  controllers: [],
  providers: [
    UserCommonModel,
  ],
  exports: [UserCommonModel],
})
export class UserCommonModule {}
