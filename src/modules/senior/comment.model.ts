import { Injectable, Inject, Scope } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { IsValidTimestampService } from "@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.service"
import { EmptyService } from "@root/src/lib/utility/empty/empty.service"
import { code, message } from '@root/src/lib/enum'
import { OK, InternalServerErrorExceptions, NotFoundExceptions, ConflictExceptions, Exception } from '@root/src/lib/exception/exception'

import { CommentRepository } from './comment.repository'
import { UpdateInterface } from './interface'


@Injectable({ scope: Scope.REQUEST })
export class CommentModel {

  constructor(
    @InjectRepository(CommentRepository) private readonly repository: CommentRepository,
    @Inject(REQUEST) private readonly request: Request,
    private isValidTimestamp:IsValidTimestampService,
    private empty:EmptyService
  ) {}

  public async create(body:any){
    try{
      const res = await this.repository.save(body)
      if(res){
        return res
      }
      throw new NotFoundExceptions({
        code:code.NOT_FOUND,
        message:message.NOT_FOUND
      })
    }catch(e:any){
      throw new Exception({
        code:e.response.error.code,
        message:e.response.error.message,
        description:e.response.error.description,
        method:this.request.url,
        path:this.request.method,
      },e.response.statusCode);
    }
  }

  public async findOneById(id:number){
    try{
      const res = await this.repository.findOne(id)
      if(res){
        return res
      }
      throw new NotFoundExceptions({
        code:code.NOT_FOUND,
        message:message.NOT_FOUND
      })
    }catch(e:any){
      throw new Exception({
        code:e.response.error.code,
        message:e.response.error.message,
        description:e.response.error.description,
        method:this.request.url,
        path:this.request.method,
      },e.response.statusCode);
    }
  }


  public async listByUserId(userId:number, search:string='', limit:number=3, offset:number=0, order:string='ASC', column:string='id', start:string='', end:string=''){
    try{

      if(limit > 15){
        limit = 15
      }
    
      if(this.empty.run(column)){
        column = "id"
      }

      if(!(order === "ASC" || order === "DESC")){
        order = "ASC"
      }

      if(start){
        start = this.isValidTimestamp.run(start)
      }

      if(end){
        end = this.isValidTimestamp.run(end)
      }
      
      const res = await this.repository.listByUserId(userId, search, limit, offset, order, column, start, end)
      const count = await this.repository.countListByUserId(userId, search, start, end)
 
      if(Object.keys(res).length != 0){
        new OK().options(search, this.request.url, this.request.method, parseInt(limit+'') , parseInt(offset+''), count, order, column, start, end)        
        return res
      }

      throw new NotFoundExceptions({
        code:code.NOT_FOUND,
        message:message.NOT_FOUND,
      })
      
    }catch(e:any){
      throw new Exception({
        code:e.response.error.code,
        message:e.response.error.message,
        description:e.response.error.description,
        method:this.request.url,
        path:this.request.method,
      },e.response.statusCode);
    }
  }

  public async listByPublicationId(publicationId:number, search:string='', limit:number=3, offset:number=0, order:string='ASC', column:string='id', start:string='', end:string=''){
    try{

      if(limit > 15){
        limit = 15
      }

      if(this.empty.run(column)){
        column = "id"
      }

      if(!(order === "ASC" || order === "DESC")){
        order = "ASC"
      }

      if(start){
        start = this.isValidTimestamp.run(start)
      }

      if(end){
        end = this.isValidTimestamp.run(end)
      }

      console.log(publicationId, search, limit, offset, order, column, start, end)

      const res = await this.repository.listByPublicationId(publicationId, search, limit, offset, order, column, start, end)
      const count = await this.repository.countListByPublicationId(publicationId, search, start, end)

      if(Object.keys(res).length != 0){
        new OK().options(search, this.request.url, this.request.method, parseInt(limit+'') , parseInt(offset+''), count, order, column, start, end)        
        return res
      }

      throw new NotFoundExceptions({
        code:code.NOT_FOUND,
        message:message.NOT_FOUND
      })

    }catch(e:any){
      console.log(e)
      throw new Exception({
        code:e.response.error.code,
        message:e.response.error.message,
        description:e.response.error.description,
        method:this.request.url,
        path:this.request.method,
      },e.response.statusCode);
    }
  }

  public async deleteById(id:number){
    try{
      const res = await this.repository.delete(id);
      if(res){
        return res
      }
    }catch(e){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
        description:"algo inesperado aconteçeu, verifique: "+`${e}`
      })
    }
  }

  public async updateById(id:number, body: UpdateInterface) {
    try{
      const res = await this.repository.update(id, { ...body as any });
      if(res){
        return res
      }
    }catch(e){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
        description:"algo aconteceu em atualizar updateAmFollowing"+` ::: ${e}`
      })
    }
  }

  public async validateID(id:number, userId:number){
    try{
      const res = await this.repository.findOne({ where:{ id: id, user_id:userId }})
      if(res){
        return true
      }
      throw new ConflictExceptions({
        code:code.DATA_CONFLICT,
        message:message.DATA_CONFLICT
      })
    }catch(e:any){
      throw new Exception({
        code:e.response.error.code,
        message:e.response.error.message,
        description:e.response.error.description,
        method:this.request.url,
        path:this.request.method,
      },e.response.statusCode);
    }
  }
}
