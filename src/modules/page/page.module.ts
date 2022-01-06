import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModel } from '@modules/user/user.model'
import { UserRepository } from '@modules/user/user.repository'
import { PageModel } from '@modules/page/page.model'
import { FirebaseModel } from '@modules/firebase/firebase.model'
import { PageEntity } from '@entity/page.entity'

import { PageController } from './page.controller'
import { PageService } from './page.service'
import { PageRepository } from './page.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, PageRepository, UserRepository])],
  controllers: [PageController],
  providers: [PageService, PageModel, FirebaseModel, UserModel],
  exports: [PageService]
})
export class PageModule {}


