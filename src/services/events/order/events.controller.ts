import { Version, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { OrderEvent } from '@root/src/services/events/order/order.events';
import { code } from '@root/src/shared/enum';
import { UseInterceptors, UseFilters } from '@nestjs/common';
import { HttpExceptions } from '@root/src/shared/http-status/http-exception';
import { OK } from '@root/src/shared/http-status/ok';
import { HttpResponse } from '@root/src/shared/http-status/http-response';

@Controller('services/event')
@ApiTags('services/event')
export class EventsController {
  constructor(private services: OrderEvent) {}

  @Get('/public/create')
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Criar um pedido por evento' })
  public createEventOrder() {
    this.services.created({
      numberOrder: 'BR1245',
      statusOrderClient: 'reserved',
      clientMethodPayment: 'money',
      taxaDelivery: 0.0,
      totalOrderValue: 125,
    });
    return new OK(
      [{ message: 'Foi criado um evento' }],
      code.SUCCESSFULLY_CREATED,
    );
  }

  @Get('/public/update')
  @Version('1')
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Atualizar o status do pedido por evento' })
  public updateEventOrder() {
    this.services.update({
      numberOrder: 'BR1245',
      statusOrderClient: 'finished',
    });
    return new OK(
      [{ message: 'Foi atualizado o evento' }],
      code.SUCCESSFULLY_UPDATED,
    );
  }
}
