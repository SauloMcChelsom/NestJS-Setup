import { Module } from '@nestjs/common';
import { OrderEvent } from './order.events';

@Module({
  imports: [],
  providers: [OrderEvent],
  exports: [OrderEvent],
})
export class OrderEventModule {}
