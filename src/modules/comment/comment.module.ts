import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommentEntity } from '../../entity/comment.entity'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { CommentRepository } from './comment.repository'
import { CommentModel } from './comment.model'

import { PageModel } from '@modules/page/page.model'
import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'
import { PageRepository } from '@modules/page/page.repository'
import { UserRepository } from '@modules/user/user.repository'
import { PublicationModel } from '@modules/publication/publication.model'
import { PublicationRepository } from '@modules/publication/publication.repository'
import { UtilityService } from "@shared/model/utility/utility.service"

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, CommentRepository, PageRepository, UserRepository, PublicationRepository])],
  controllers: [CommentController],
  providers: [CommentService, UtilityService, CommentModel, PublicationModel, PageModel, FirebaseModel, UserModel],
  exports: [CommentService]
})
export class CommentModule {}


