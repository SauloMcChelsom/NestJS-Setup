import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsValidTimestampModule } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.module';
import { EmptyModule } from '@root/src/shared/utility/empty/empty.module';

import { FormEntity } from '@entity/form.entity';
import { FormEntityModel } from './form-entity.model';
import { FormEntityRepository } from './form-entity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormEntity, FormEntityRepository]),
    IsValidTimestampModule,
    EmptyModule,
  ],
  controllers: [],
  providers: [FormEntityModel],
  exports: [FormEntityModel],
})
export class FormEntityModule{}
