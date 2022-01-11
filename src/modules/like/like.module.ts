import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UtilityModule } from '@shared/model/utility/utility.module'
import { PublicationModule } from '@modules/publication/publication.module'
import { UserModule } from '@modules/user/user.module'
import { FirebaseModule } from '@modules/firebase/firebase.module'
import { LikeEntity } from '@entity/like.entity'

import { LikeController } from './like.controller'
import { LikeService } from './like.service'
import { LikeRepository } from './like.repository'
import { LikeModel } from './like.model'

import { CreateMapper } from './mapper/create.mapper'

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, LikeRepository]),
    FirebaseModule,
    UtilityModule,
    PublicationModule,
    UserModule
  ],
  controllers: [LikeController],
  providers: [
    LikeService, 
    LikeModel, 
    CreateMapper
  ],
  exports: [LikeService]
}) 
export class LikeModule {}


