import { Controller, Query, Post, Body, Get, Param  } from '@nestjs/common'

import { SeniorService } from './senior.service'
import { CheckInSeniorDto, CreateSeniorDto } from './dto/index.dto'

@Controller('senior')
export class SeniorController {

  constructor(private readonly service: SeniorService) {}

  @Post('/incluir-pessoa')
  public async create(@Body() body: CreateSeniorDto) {
    return await this.service.create(body);
  }

  @Post('/check-in')
  public async createCheckIn(@Body() body: CheckInSeniorDto) {
    return await this.service.createCheckIn(body);
  }

  @Get('/filtro/documentos/:doc')
  public async filtroDocumentos(@Param('doc') doc: string) {
    return await this.service.consultarDocumentos(doc);
  }

  @Get('/validar/documentos/:doc')
  public async validarDocumentos(@Param('doc') doc: string) {
    return await this.service.validarDocumentos(doc);
  }

  @Get('/filtro/pessoas-ainda-presentes')
  public async filtroPessoasAindaPresentes(@Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string) {
    const cls = {
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0, 
      order:order, 
      column:column
    }
    return await this.service.pessoasAindaPresentes(cls);
  }

  @Get('/filtro/pessoas-que-ja-deixaram-hotel')
  public async filtroPessoasQueJaDeixaramHotel(@Query('limit') limit: string='3', @Query('offset') offset:string='0', @Query('order') order:string, @Query('column') column:string) {
    const cls = {
      limit:parseInt(limit) ? parseInt(limit) : 5, 
      offset:parseInt(offset) ? parseInt(offset) : 0, 
      order:order, 
      column:column
    }
    return await this.service.pessoasQueJaDeixaramHotel(cls);
  }
 
}
