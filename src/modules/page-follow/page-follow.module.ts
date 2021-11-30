import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageEntity } from '../../entity/page.entity'
import { PageFollowController } from './page-follow.controller'
import { PageFollowService } from './page-follow.service'
import { PageFollowRepository } from './page-follow.repository'
import { FirebaseValidate } from '@modules/firebase/firebase.validate'
import { UserRepository } from '@modules/user/user.repository'
import { PageFollowModel } from '@modules/page-follow/page-follow.model'
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, PageFollowRepository, UserRepository])],
  controllers: [PageFollowController],
  providers: [PageFollowService, PageFollowModel, FirebaseValidate ],
  exports: [PageFollowService]
})
export class PageFollowModule {}


