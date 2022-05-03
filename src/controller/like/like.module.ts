import { Module } from '@nestjs/common'

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module'
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module'
import { LikeEntityModule } from '@model/like-entity/like-entity.module'

import { LikeMapper } from './mapper/index.mapper'
import { LikeController } from './like.controller'
import { LikeService } from './like.service'

@Module({
  imports: [
    LikeEntityModule,
    IsValidTimestampModule,
    EmptyModule
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeMapper],
  exports: [LikeService],
})
export class LikeModule {}
