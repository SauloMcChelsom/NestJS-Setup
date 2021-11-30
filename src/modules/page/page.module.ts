import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageEntity } from '../../entity/page.entity'
import { PageController } from './page.controller'
import { PageService } from './page.service'
import { PageRepository } from './page.repository'
import { UserModel } from '@root/src/modules/user/user.model'
import { PageModel } from '@root/src/modules/page/page.model'
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'
import { UserRepository } from '@modules/user/user.repository'
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, PageRepository, UserRepository])],
  controllers: [PageController],
  providers: [PageService, PageModel, FirebaseModel, UserModel],
  exports: [PageService]
})
export class PageModule {}


