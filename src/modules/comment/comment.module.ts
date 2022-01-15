import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FirebaseModule } from '@modules/firebase/firebase.module'
import { UtilityModule } from "@shared/model/utility/utility.module"
import { UserModule } from '@modules/user/user.module'
import { PublicationModule } from '@modules/publication/publication.module'

import { CommentEntity } from '@entity/comment.entity'

import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { CommentModel } from './comment.model'
import { CommentRepository } from './comment.repository'

import { 
  CreateMapper, 
  AuthListMapper, 
  PublicListMapper,
  AuthFindOneMapper,
  UpdateMapper,
  PublicFindOneMapper
} from './mapper'

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, CommentRepository]), 
    UserModule,
    UtilityModule,
    FirebaseModule,
    PublicationModule
  ],
  controllers: [CommentController],
  providers: [
    CommentService, 
    CommentModel, 
    AuthListMapper, 
    PublicListMapper,
    AuthFindOneMapper,
    PublicFindOneMapper,
    CreateMapper, 
    UpdateMapper,
  ],
  exports: [CommentService]
})
export class CommentModule {}


