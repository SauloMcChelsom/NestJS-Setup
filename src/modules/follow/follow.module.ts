import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FirebaseModule } from '@modules/firebase/firebase.module'
import { IsValidTimestampModule } from "@shared/utility/is-valid-timestamp/is-valid-timestamp.module"
import { EmptyModule } from "@shared/utility/empty/empty.module"
import { UserModule } from '@modules/user/user.module'
import { PageModule } from '@modules/page/page.module'
import { PageEntity } from '@entity/page.entity'

import { FollowController } from './follow.controller'
import { FollowService } from './follow.service'
import { FollowRepository } from './follow.repository'
import { FollowModel } from './follow.model'

import { 
  CreateMapper, 
  AuthListMapper, 
} from './mapper'

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, FollowRepository]),
    UserModule,
    IsValidTimestampModule,
    EmptyModule,
    FirebaseModule,
    PageModule
  ],
  controllers: [FollowController],
  providers: [
    FollowService, 
    FollowModel, 
    AuthListMapper, 
    CreateMapper,
  ],
  exports: [FollowService]
})
export class FollowModule {}


