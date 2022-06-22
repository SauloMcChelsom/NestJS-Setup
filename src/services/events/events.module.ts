import { Module } from '@nestjs/common';
import { EventsController } from './order/events.controller';
import { OrderEventModule } from '@root/src/services/events/order/order.module';

@Module({
  imports: [OrderEventModule],
  controllers: [EventsController],
  providers: [],
  exports: [],
})
export class EventsModule {}
