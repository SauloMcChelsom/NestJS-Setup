import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageEntity } from '../../entity/page.entity'
import { FollowController } from './follow.controller'
import { FollowService } from './follow.service'
import { FollowRepository } from './follow.repository'
import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserRepository } from '@modules/user/user.repository'
import { FollowModel } from '@root/src/modules/follow/follow.model'
import { PageModel } from '@modules/page/page.model'
import { PageRepository } from '@modules/page/page.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, FollowRepository, UserRepository, PageRepository])],
  controllers: [FollowController],
  providers: [FollowService, FollowModel, FirebaseModel, PageModel ],
  exports: [FollowService]
})
export class FollowModule {}


