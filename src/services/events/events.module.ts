import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { OrderEventModule } from '@root/src/shared/events/order/order.module';

@Module({
  imports: [OrderEventModule],
  controllers: [EventsController],
  providers: [],
  exports: [],
})
export class EvenstModule {}
