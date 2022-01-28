import { Version, Post, Body, Controller, Get  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { OrderEvent } from'@root/src/lib/events/order/order.events'
import { CreateDto } from '@root/src/modules/user/dto/create.dto'
import { code, message } from '@root/src/lib/enum'
import { OK } from '@root/src/lib/exception/exception'

@Controller('services/event')
@ApiTags('services/event')
export class EventsController {

  constructor(private services:OrderEvent) {}

  @Get('/public/create')
  @Version('1')
  @ApiOperation({ summary: 'Criar um pedido por evento' })
  createEventOrder() {
    this.services.created({
      numberOrder:'BR1245',
      statusOrderClient: 'reserved',
      clientMethodPayment: 'money',
      taxaDelivery:0.00,
      totalOrderValue:125
    });
    return new OK([{message:'Foi criado um evento'}], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED)
  }

  @Get('/public/update')
  @Version('1')
  @ApiOperation({ summary: 'Atualizar o status do pedido por evento' })
  updateEventOrder() {
    this.services.update({
      numberOrder:'BR1245',
      statusOrderClient: 'finished'
    });
    return new OK([{message:'Foi atualizado o evento'}], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED)
  }

}