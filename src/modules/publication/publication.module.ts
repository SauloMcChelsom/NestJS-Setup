import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PageModel } from '@modules/page/page.model'
import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'
import { PageRepository } from '@modules/page/page.repository'
import { UserRepository } from '@modules/user/user.repository'
import { PublicationEntity } from '@entity/publication.entity'
import { UtilityService } from '@shared/model/utility/utility.service'

import { PublicationController } from './publication.controller'
import { PublicationService } from './publication.service'
import { PublicationRepository } from './publication.repository'
import { PublicationModel } from './publication.model'

import { 
  CreateMapper, 
  AuthListMapper, 
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper
} from './mapper'

@Module({
  imports: [TypeOrmModule.forFeature([PublicationEntity, PublicationRepository, PageRepository, UserRepository])],
  controllers: [PublicationController],
  providers: [
    PublicationService, 
    PublicationModel, 
    PageModel, 
    FirebaseModel, 
    UtilityService,
    UserModel,
    CreateMapper, 
    AuthListMapper, 
    PublicListMapper,
    AuthFindOneMapper,
    PublicFindOneMapper
  ],
  exports: [PublicationService]
})
export class PublicationModule {}


