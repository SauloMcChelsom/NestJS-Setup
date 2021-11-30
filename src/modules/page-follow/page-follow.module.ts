import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageEntity } from '../../entity/page.entity'
import { PageFollowController } from './page-follow.controller'
import { PageFollowService } from './page-follow.service'
import { PageFollowRepository } from './page-follow.repository'
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'
import { UserRepository } from '@modules/user/user.repository'
import { PageFollowModel } from '@modules/page-follow/page-follow.model'
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, PageFollowRepository, UserRepository])],
  controllers: [PageFollowController],
  providers: [PageFollowService, PageFollowModel, FirebaseModel ],
  exports: [PageFollowService]
})
export class PageFollowModule {}


