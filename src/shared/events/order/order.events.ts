import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { CreateOrderEvent, UpdateOrderEvent } from '@shared/interfaces/events/order-event.interface'


@Injectable()
export class OrderEvent {
    constructor(private eventEmitter: EventEmitter2){}

    public created() {
        this.eventEmitter.emit('order.create', 'Hello World')
    }

    @OnEvent('order.*')
    listen(payload: string) {
        console.log('Message Received: ', payload)
    }
}