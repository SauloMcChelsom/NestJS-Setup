import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModel } from '@modules/user/user.model'
import { UserRepository } from '@modules/user/user.repository'
import { FirebaseModel } from '@modules/firebase/firebase.model'
import { PageEntity } from '@entity/page.entity'
import { UtilityService } from '@shared/model/utility/utility.service'

import { PageModel } from './page.model'
import { PageController } from './page.controller'
import { PageService } from './page.service'
import { PageRepository } from './page.repository'

import { 
  CreateMapper, 
  AuthListMapper, 
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper
} from './mapper'

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, PageRepository, UserRepository])],
  controllers: [PageController],
  providers: [
    PageService, 
    PageModel, 
    FirebaseModel, 
    UserModel,
    UtilityService, 
    CreateMapper, 
    AuthListMapper, 
    PublicListMapper,
    AuthFindOneMapper,
    PublicFindOneMapper
  ],
  exports: [PageService]
})
export class PageModule {}


