import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FirebaseModule } from '@modules/firebase/firebase.module';
import { IsValidTimestampModule } from '@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/lib/utility/empty/empty.module';
import { UserModule } from '@modules/user/user.module';
import { PageEntity } from '@entity/page.entity';

import { PageModel } from './page.model';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { PageRepository } from './page.repository';

import {
  CreateMapper,
  AuthListMapper,
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper,
} from './mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([PageEntity, PageRepository]),
    UserModule,
    IsValidTimestampModule,
    EmptyModule,
    FirebaseModule,
  ],
  controllers: [PageController],
  providers: [
    PageService,
    PageModel,
    AuthListMapper,
    PublicListMapper,
    AuthFindOneMapper,
    PublicFindOneMapper,
    CreateMapper,
  ],
  exports: [PageService],
})
export class PageModule {}
