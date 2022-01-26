
import { Global, Module } from '@nestjs/common';
import { OrderEvent } from './order.events'

@Global()
@Module({
  imports: [],
  providers: [
    OrderEvent
  ],
  exports:[
    OrderEvent
  ]
})
export class OrderEventModule {}