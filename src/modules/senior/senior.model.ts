import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { SeniorRepository, CheckInRepository } from './senior.repository'
import { CreateDto } from './dto/create.dto'
import { CreateCkeckInDto } from './dto/create-check-in.dto'


@Injectable()
export class SeniorModel {

  constructor(
    @InjectRepository(SeniorRepository) private readonly pessoa: SeniorRepository,
    @InjectRepository(CheckInRepository) private readonly check_in: CheckInRepository
  ) {}

  public async create(body: CreateDto) {
    try {
      return await this.pessoa.save(body);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOneById(id:number){
    try{
      const res = await this.pessoa.findOne(id)
      if(res){
        return res
      }
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND)
    }catch(e:any){
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }


  public async createCheckIn(body: CreateCkeckInDto) {
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

      if(limit > 15){
        limit = 15
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
      if(limit > 15){
        limit = 15
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
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public async consultarDocumentos(doc:string){
    try{
      const res = await this.pessoa.findOne({ where:{ documents: doc}})
      if(res){
        return res
      }
      throw Error
    }catch(e){
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }
  }
}

