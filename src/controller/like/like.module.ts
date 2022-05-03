import { Module } from '@nestjs/common'

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module'
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module'
import { LikeEntityModule } from '@model/like-entity/like-entity.module'
import { UserEntityModule } from '@root/src/model/user-entity/user-entity.module'
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module'

import { LikeMapper } from './mapper/index.mapper'
import { LikeController } from './like.controller'
import { LikeService } from './like.service'

@Module({
  imports: [
    LikeEntityModule,
    IsValidTimestampModule,
    EmptyModule,
    UserEntityModule,
    JwtLocalModule
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeMapper],
  exports: [LikeService],
})
export class LikeModule {}
