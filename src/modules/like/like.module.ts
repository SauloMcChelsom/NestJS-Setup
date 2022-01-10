import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LikeEntity } from '../../entity/like.entity'
import { LikeController } from './like.controller'
import { LikeService } from './like.service'
import { LikeRepository } from './like.repository'
import { LikeModel } from './like.model'
import { UtilityService } from '@shared/model/utility/utility.service'

import { PublicationService } from '@modules/publication/publication.service'
import { FirebaseModel } from '@modules/firebase/firebase.model'

import { CreateMapper } from './mapper/create.mapper'

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, LikeRepository])],
  controllers: [LikeController],
  providers: [
    LikeService, 
    LikeModel, 
    UtilityService,
    PublicationService,
    FirebaseModel, 
    CreateMapper
  ],
  exports: [LikeService]
})
export class LikeModule {}


