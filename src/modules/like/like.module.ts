import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LikeEntity } from '../../entity/like.entity'
import { LikeController } from './like.controller'
import { LikeService } from './like.service'
import { LikeRepository } from './like.repository'
import { LikeModel } from './like.model'

import { PageModel } from '@modules/page/page.model'
import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'
import { PageRepository } from '@modules/page/page.repository'
import { UserRepository } from '@modules/user/user.repository'
import { PublicationModel } from '@modules/publication/publication.model'
import { PublicationRepository } from '@modules/publication/publication.repository'

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, LikeRepository, PageRepository, UserRepository, PublicationRepository])],
  controllers: [LikeController],
  providers: [LikeService, LikeModel, PublicationModel, PageModel, FirebaseModel, UserModel],
  exports: [LikeService]
})
export class LikeModule {}


