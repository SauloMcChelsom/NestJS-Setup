import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { CheckInSenior, CreateSenior } from '@shared/interfaces/senior.interface'
import { CheckInSeniorEntityRepository, UserSeniorEntityRepository } from './senior-entity.repository'

@Injectable()
export class SeniorEntityModel {

  constructor(
    @InjectRepository(UserSeniorEntityRepository) private readonly client: UserSeniorEntityRepository,
    @InjectRepository(CheckInSeniorEntityRepository) private readonly check_in: CheckInSeniorEntityRepository
  ) {}

  public async create(body: CreateSenior) {
    try {
      return await this.client.save(body);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOneById(id:number){
    try{
      const res = await this.client.findOne(id)
      if(res){
        return res
      }
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND)
    }catch(e:any){
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }


  public async createCheckIn(body: CheckInSenior) {
    try {
      return await this.check_in.save(body);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOneByIdCheckIn(id:number){
    try{
      const res = await this.check_in.findOne(id)
      if(res){
        return res
      }
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND)
    }catch(e:any){
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND)
    }catch(e:any){
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND)
    }catch(e:any){
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  public async consultarDocumentos(doc:string){
    try{
      const res = await this.client.findOne({ where:{ documents: doc}})
      if(res){
        return res
      }
      throw Error
    }catch(e){
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  public async validarDocumentos(doc:string){
    try{
      const res = await this.client.findOne({ where:{ documents: doc}})
      if(res){
        throw Error
      }
      return 'documento disponivel para cadastro'
    }catch(e){
      throw new HttpException('Cliente já existe', HttpStatus.NOT_FOUND);
    }
  }
}

