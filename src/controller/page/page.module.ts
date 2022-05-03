import { Module } from '@nestjs/common';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';
import { PageEntityModule } from '@model/page-entity/page-entity.module'
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module'
import { UserEntityModule } from '@model/user-entity/user-entity.module'

import { PageController } from './page.controller';
import { PageService } from './page.service';
import { PageMapper } from './mapper';

@Module({
  imports: [
    IsValidTimestampModule,
    EmptyModule,
    PageEntityModule,
    JwtLocalModule,
    UserEntityModule
  ],
  controllers: [PageController],
  providers: [
    PageService,
    PageMapper
  ],
  exports: [PageService],
})
export class PageModule {}
