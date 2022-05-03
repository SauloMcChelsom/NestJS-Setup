import { Module } from '@nestjs/common';

import { PublicationEntityModule } from '@model/publication-entity/publication-entity.module';
import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';

import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PageMapper } from './mapper';

@Module({
  imports: [
    IsValidTimestampModule,
    EmptyModule,
    PublicationEntityModule
  ],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    PageMapper
  ],
  exports: [PublicationService],
})
export class PublicationModule {}
