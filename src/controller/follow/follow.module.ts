import { Module } from '@nestjs/common';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';
import { FollowEntityModule } from '@model/follow-entity/follow-entity.module'
import { UserEntityModule } from '@root/src/model/user-entity/user-entity.module'
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module'

import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { FollowMapper } from './mapper';

@Module({
  imports: [
    IsValidTimestampModule,
    EmptyModule,
    FollowEntityModule,
    UserEntityModule,
    JwtLocalModule
  ],
  controllers: [FollowController],
  providers: [FollowService, FollowMapper],
  exports: [FollowService],
})
export class FollowModule {}
