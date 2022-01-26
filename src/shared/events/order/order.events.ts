import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { CreateOrderEvent, UpdateOrderEvent } from '@shared/interfaces/events/order-event.interface'

@Injectable()
export class OrderEvent {
    constructor(private eventEmitter: EventEmitter2){}

    public created(payload:CreateOrderEvent) {
        this.eventEmitter.emit('order.create', payload)
    }

    public update(payload:UpdateOrderEvent) {
        this.eventEmitter.emit('order.update', payload)
    }

    @OnEvent('order.*')
    listen(payload: CreateOrderEvent | UpdateOrderEvent) {
        console.log('Message Received: ', payload)
    }
}

/**
 *  
  @Get('/public/event/create')
  @Version('1')
  @ApiOperation({ summary: 'Criar um pedido por evento' })
  createEventOrder() {
    this.eventOrder.created({
      numberOrder:'BR1245',
      statusOrderClient: 'reserved',
      clientMethodPayment: 'money',
      taxaDelivery:0.00,
      totalOrderValue:125
    });
    return {}
  }

  @Get('/public/event/update')
  @Version('1')
  @ApiOperation({ summary: 'Atualizar o status do pedido por evento' })
  updateEventOrder() {
    this.eventOrder.update({
      numberOrder:'BR1245',
      statusOrderClient: 'finished'
    });
    return {}
  }
 */