import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  CreateOrderEvent,
  UpdateOrderEvent,
} from '@root/src/shared/interfaces/order-event.interface';

@Injectable()
export class OrderEvent {
  constructor(private eventEmitter: EventEmitter2) {}

  public created(payload: CreateOrderEvent) {
    this.eventEmitter.emit('order.create', payload);
  }

  public update(payload: UpdateOrderEvent) {
    this.eventEmitter.emit('order.update', payload);
  }

  @OnEvent('order.*')
  listen(payload: CreateOrderEvent | UpdateOrderEvent) {
    console.log('Message Received: ', payload);
  }
}
