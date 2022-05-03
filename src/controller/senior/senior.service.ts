import { Injectable } from '@nestjs/common'
import { SeniorEntityModel } from '@model/senior-entity/senior-entity.model'
import { CheckInSeniorDto, CreateSeniorDto } from './dto/index.dto'

@Injectable()
export class SeniorService {

  constructor(private model: SeniorEntityModel) {}

  public async create(body:CreateSeniorDto) {
    let create = await this.model.create(body)
    return await this.model.findOneById(create.id)
  }

  public async createCheckIn(body:CheckInSeniorDto) {
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

  public async validarDocumentos(doc:string) {
    return await this.model.validarDocumentos(doc)
  }

}