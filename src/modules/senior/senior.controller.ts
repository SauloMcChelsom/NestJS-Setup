import { Controller, Headers, Query, Post, Body, Get, Param  } from '@nestjs/common'

import { OK } from '@root/src/lib/exception/exception'
import { code, message } from '@root/src/lib/enum'

import { SeniorService } from './senior.service'
import { CreateDto } from './dto/create.dto'
import { CreateCkeckInDto } from './dto/create-check-in.dto'

@Controller('senior')
export class SeniorController {

  constructor(private readonly service: SeniorService) {}

  @Post('/incluir-pessoa')
  public async create(@Body() body: CreateDto) {
    let res = await this.service.create(body);
    return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  @Post('/check-in')
  public async createCheckIn(@Body() body: CreateCkeckInDto) {
    let res = await this.service.createCheckIn(body);
    return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  @Get('/filtro/documentos/:doc')
  public async filtroDocumentos(@Param('doc') doc: string) {
    let res = await this.service.consultarDocumentos(doc);
    return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }


  @Get('/filtro/pessoas-ainda-presentes')
  public async filtroPessoasAindaPresentes(@Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string) {
    const cls = {
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0, 
      order:order, 
      column:column
    }
    let res = await this.service.pessoasAindaPresentes(cls);
    return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  @Get('/filtro/pessoas-que-ja-deixaram-hotel')
  public async filtroPessoasQueJaDeixaramHotel(@Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string) {
    const cls = {
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0, 
      order:order, 
      column:column
    }
    let res = await this.service.pessoasQueJaDeixaramHotel(cls);
    return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }
 
}
