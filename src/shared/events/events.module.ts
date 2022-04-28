import { Module } from '@nestjs/common';
import { OrderEventModule } from './order/order.module';

@Module({
  imports: [OrderEventModule],
  providers: [],
  exports: [],
})
export class EventModule {}
