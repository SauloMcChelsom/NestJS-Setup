import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageEntity } from '../../entity/page.entity'
import { PageController } from './page.controller'
import { PageService } from './page.service'
import { PageRepository } from './page.repository'
import { UserValidate } from '@modules/user/user.validate'
import { PageValidate } from '@modules/page/page.validate'
import { FirebaseValidate } from '@modules/firebase/firebase.validate'
import { UserRepository } from '@modules/user/user.repository'
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, PageRepository, UserRepository])],
  controllers: [PageController],
  providers: [PageService, PageValidate, FirebaseValidate, UserValidate],
  exports: [PageService]
})
export class PageModule {}


