import { Injectable } from '@nestjs/common'
import { SeniorModel } from './senior.model'
import { CreateDto } from './dto/create.dto'
import { CreateCkeckInDto } from './dto/create-check-in.dto'

@Injectable()
export class SeniorService {

  constructor(private model: SeniorModel) {}

  public async create(body:CreateDto) {
    let create = await this.model.create(body)
    return await this.model.findOneById(create.id)
  }

  public async createCheckIn(body:CreateCkeckInDto) {
    let create = await this.model.createCheckIn(body)
    return await this.model.findOneByIdCheckIn(create.id)
  }

  public async pessoasAindaPresentes(cls:any) {
    return await this.model.pessoasAindaPresentes(cls.limit, cls.offset, cls.order, cls.column)
  }

  public async pessoasQueJaDeixaramHotel(cls:any) {
    return await this.model.pessoasQueJaDeixaramHotel(cls.limit, cls.offset, cls.order, cls.column)
  }

  public async consultarDocumentos(doc:string) {
    return await this.model.consultarDocumentos(doc)
  }


}