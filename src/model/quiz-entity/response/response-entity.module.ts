import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';

import { ResponseEntity } from '@entity/response.entity';
import { ResponseEntityModel } from './response-entity.model';
import { ResponseEntityRepository } from './response-entity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResponseEntity, ResponseEntityRepository]),
    IsValidTimestampModule,
    EmptyModule,
  ],
  controllers: [],
  providers: [ResponseEntityModel],
  exports: [ResponseEntityModel],
})
export class ResponseEntityModule{}
