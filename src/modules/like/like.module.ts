import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidTimestampModule } from '@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/lib/utility/empty/empty.module';
import { PublicationModule } from '@modules/publication/publication.module';
import { UserModule } from '@modules/user/user.module';
import { FirebaseModule } from '@modules/firebase/firebase.module';
import { LikeEntity } from '@entity/like.entity';

import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { LikeModel } from './like.model';

import { CreateMapper } from './mapper/create.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity, LikeRepository]),
    FirebaseModule,
    IsValidTimestampModule,
    EmptyModule,
    PublicationModule,
    UserModule,
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeModel, CreateMapper],
  exports: [LikeService],
})
export class LikeModule {}
