import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageEntity } from '../../entity/page.entity'
import { PageSegmentsController } from './page-segments.controller'
import { PageSegmentsService } from './page-segments.service'
import { PageSegmentsRepository } from './page-segments.repository'
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'
import { UserRepository } from '@modules/user/user.repository'
import { PageSegmentsModel } from '@root/src/modules/page-segments/page-segments.model'
import { PageModel } from '@modules/page/page.model'
import { PageRepository } from '@modules/page/page.repository'
@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, PageSegmentsRepository, UserRepository, PageRepository])],
  controllers: [PageSegmentsController],
  providers: [PageSegmentsService, PageSegmentsModel, FirebaseModel, PageModel ],
  exports: [PageSegmentsService]
})
export class PageSegmentsModule {}


