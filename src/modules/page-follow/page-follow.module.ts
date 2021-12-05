import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageEntity } from '../../entity/page.entity'
import { PageFollowController } from './page-follow.controller'
import { PageFollowService } from './page-follow.service'
import { PageFollowRepository } from './page-follow.repository'
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'
import { UserRepository } from '@modules/user/user.repository'
import { PageFollowModel } from '@modules/page-follow/page-follow.model'
import { PageModel } from '@modules/page/page.model'
import { PageRepository } from '@modules/page/page.repository'
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, PageFollowRepository, UserRepository, PageRepository])],
  controllers: [PageFollowController],
  providers: [PageFollowService, PageFollowModel, FirebaseModel, PageModel ],
  exports: [PageFollowService]
})
export class PageFollowModule {}


