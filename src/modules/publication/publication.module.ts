import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FirebaseModule } from '@modules/firebase/firebase.module';
import { IsValidTimestampModule } from '@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/lib/utility/empty/empty.module';
import { UserModule } from '@modules/user/user.module';
import { PageModule } from '@modules/page/page.module';
import { PublicationEntity } from '@entity/publication.entity';

import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PublicationRepository } from './publication.repository';
import { PublicationModel } from './publication.model';

import {
  AuthListMapper,
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper,
  CreateMapper,
} from './mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicationEntity, PublicationRepository]),
    UserModule,
    IsValidTimestampModule,
    EmptyModule,
    FirebaseModule,
    PageModule,
  ],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    PublicationModel,
    AuthListMapper,
    PublicListMapper,
    AuthFindOneMapper,
    PublicFindOneMapper,
    CreateMapper,
  ],
  exports: [PublicationService],
})
export class PublicationModule {}
