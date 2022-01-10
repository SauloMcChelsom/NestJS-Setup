import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserRepository } from '@modules/user/user.repository'
import { PageModel } from '@modules/page/page.model'
import { PageRepository } from '@modules/page/page.repository'
import { PageEntity } from '@entity/page.entity'
import { UtilityService } from '@shared/model/utility/utility.service'

import { FollowController } from './follow.controller'
import { FollowService } from './follow.service'
import { FollowRepository } from './follow.repository'
import { FollowModel } from './follow.model'

import { 
  CreateMapper, 
  AuthListMapper, 
} from './mapper'

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, FollowRepository, UserRepository, PageRepository])],
  controllers: [FollowController],
  providers: [
    FollowService, 
    FollowModel, 
    FirebaseModel, 
    UtilityService,
    PageModel,
    CreateMapper, 
    AuthListMapper, 
  ],
  exports: [FollowService]
})
export class FollowModule {}


