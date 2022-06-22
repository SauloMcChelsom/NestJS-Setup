import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { code, message } from '@root/src/shared/enum'

import { CheckInSenior, CreateSenior } from '@shared/interfaces/senior.interface'
import { CheckInSeniorEntityRepository, UserSeniorEntityRepository } from './senior-entity.repository'

@Injectable()
export class SeniorEntityModel {

  constructor(
    @InjectRepository(UserSeniorEntityRepository) 
    private readonly client: UserSeniorEntityRepository,
    @InjectRepository(CheckInSeniorEntityRepository) 
    private readonly check_in: CheckInSeniorEntityRepository
  ) {}

  public async create(body: CreateSenior) {
    try {
      return await this.client.save(body).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async findOneById(id:number){
    try{
      const res = await this.client.findOne(id).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return res
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found user by id',
        description : ``
      }, HttpStatus.NOT_FOUND)

    }catch(e:any){
      throw new HttpException(e.response, e.status);
    }
  }

  public async createCheckIn(body: CheckInSenior) {
    try {
      return await this.check_in.save(body).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })
    } catch (e:any){
      throw new HttpException(e.response, e.status);
    }
  }

  public async findOneByIdCheckIn(id:number){
    try{
      const res = await this.check_in.findOne(id).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return res
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found check in by id',
        description : ``
      }, HttpStatus.NOT_FOUND)

    }catch(e:any){
      throw new HttpException(e.response, e.status);
    }
  }

  public async pessoasAindaPresentes(limit:number=3, offset:number=0, order:string='ASC', column:string='id'){
    try{

      if(limit > 3){
        limit = 3
      }

      if(!(order === "ASC" || order === "DESC")){
        order = "ASC"
      }

      const res = await this.check_in.pessoasAindaPresentes(limit, offset, order, column)
      if(res){
        return res
      }
      throw new HttpException({
        code : code.NOT_FOUND,
        message : message.NOT_FOUND,
        description : ``
      }, HttpStatus.NOT_FOUND)
    }catch(e:any){
      throw new HttpException(e.response, e.status);
    }
  }

  public async pessoasQueJaDeixaramHotel(limit:number=3, offset:number=0, order:string='ASC', column:string='id'){
    try{
      if(limit > 3){
        limit = 3
      }

      if(!(order === "ASC" || order === "DESC")){
        order = "ASC"
      }
      const res = await this.check_in.pessoasQueJaDeixaramHotel(limit, offset, order, column)
      if(res){
        return res
      }
      throw new HttpException({
        code : code.NOT_FOUND,
        message : message.NOT_FOUND,
        description : ``
      }, HttpStatus.NOT_FOUND)
    }catch(e:any){
      throw new HttpException(e.response, e.status);
    }
  }

  public async consultarDocumentos(doc:string){
    try{
      const res = await this.client.findOne({ where:{ documents: doc}}).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if(res){
        return res
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'Document not found',
        description : ``
      }, HttpStatus.NOT_FOUND)

    }catch(e:any){
      throw new HttpException(e.response, e.status);
    }
  }

  public async validarDocumentos(doc:string){
    try{
      const res = await this.client.findOne({ where:{ documents: doc}}).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        throw new HttpException({
          code : code.ALREADY_IN_USE,
          message : 'Cliente já existe',
          description : ''
        }, HttpStatus.NOT_FOUND)
      }

      return 'documento disponivel para cadastro'
    }catch(e:any){
      throw new HttpException(e.response, e.status);
    }
  }
}

