import { Module } from '@nestjs/common';
import { ViewsController } from './controller/views.controller';

@Module({
  imports: [],
  controllers: [ViewsController],
  providers: [],
  exports: [],
})
export class ViewsModule {}
