import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublicationEntity } from '../../entity/publication.entity'
import { PublicationController } from './publication.controller'
import { PublicationService } from './publication.service'
import { PublicationRepository } from './publication.repository'

import { PageModel } from '@modules/page/page.model'
import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'
import { PageRepository } from '@modules/page/page.repository'
import { UserRepository } from '@modules/user/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PublicationEntity, PublicationRepository, PageRepository, UserRepository])],
  controllers: [PublicationController],
  providers: [PublicationService, PageModel, FirebaseModel, UserModel],
  exports: [PublicationService]
})
export class PublicationModule {}


