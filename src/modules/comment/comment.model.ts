import { Injectable, Inject, Scope } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { code, message } from '@shared/enum'
import { UtilityService } from "@shared/model/utility/utility.service"
import { InternalServerErrorExceptions, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { CommentRepository } from './comment.repository'

import { UpdateDto } from './dto/update.dto'

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';


@Injectable({ scope: Scope.REQUEST })
export class CommentModel {

  constructor(
    @InjectRepository(CommentRepository) private readonly repository: CommentRepository,
    @Inject(REQUEST) private readonly request: Request,
    private utility:UtilityService
  ) {}

  public async create(comment:any){
    try{
      const res = await this.repository.save(comment)
      if(res){
        return res
      }
      throw 'error'
    }catch(Exception){
      if(Exception == 'error'){
        throw new NotFoundExceptions({
          code:code.NOT_FOUND,
          message:message.NOT_FOUND,
          method:this.request.url,
          path:this.request.method,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
        description:"algo inesperado aconteçeu, verifique: "+`${Exception}`
      })
    }
  }

  public async findOneByUserIdAndPublicationId(publicationId:string, userId:string){
    try{
      const res = await this.repository.findOne({ where:{ publication_id: publicationId, user_id:userId }})
      if(res){
        return res
      }
      throw 'error'
    }catch(Exception){
      if(Exception == 'error'){
        throw new NotFoundExceptions({
          code:code.NOT_FOUND,
          message:message.NOT_FOUND,
          method:this.request.url,
          path:this.request.method,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
        description:"algo inesperado aconteçeu, verifique: "+`${Exception}`,
      })
    }
  }

  public async findOneById(id:string){
    try{
      const res = await this.repository.findOne(id)
      if(res){
        return res
      }
      throw 'error'
    }catch(Exception){
      if(Exception == 'error'){
        throw new NotFoundExceptions({
          code:code.NOT_FOUND,
          message:message.NOT_FOUND,
          method:this.request.url,
          path:this.request.method,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
        description:"algo inesperado aconteçeu, verifique: "+`${Exception}`
      })
    }
  }

  public async findByUserId(userId:string, limit:number=3, offset:number=0, orderBy:string='ASC', column:string='id'){
    try{
      const count = await this.repository.count({ where: {user_id: userId}});
     
      
      if(this.utility.empty(column)){
        column = "id"
      }

      if(!(orderBy === "ASC" || orderBy === "DESC")){
        orderBy = "ASC"
      }

      let order:any = new Object();
          order[column] = orderBy;////DESC ASC

   
      const res = await this.repository.find({
        select: ["comment", "id"],
        
        where: {
          user_id: userId
        },

        order: order,

        skip: offset,
        take: limit,
      });
      if(Object.keys(res).length != 0){

        return [res, limit, offset, count, orderBy, column, this.request.url, this.request.method]
      }
      throw 'error'
    }catch(Exception){
      if(Exception == 'error'){
        throw new NotFoundExceptions({
          code:code.NOT_FOUND,
          message:message.NOT_FOUND,
          method:this.request.url,
          path:this.request.method,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
        description:"algo inesperado aconteçeu, "+`${Exception}`
      })
    }
  }

  public async findByPublicationId(publicationId:string){
    try{
        const res = await this.repository.find({ where:{ publication_id: publicationId }})
        if(Object.keys(res).length != 0){
          return res
        }
        throw 'error'
    }catch(Exception){
      if(Exception == 'error'){
        throw new NotFoundExceptions({
          code:code.NOT_FOUND,
          message:message.NOT_FOUND,
          method:this.request.url,
          path:this.request.method,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
        description:"algo inesperado aconteçeu, verifique: "+`${Exception}`
      })
    }
  }

  public async deleteById(id:string){
    try{
      const res = await this.repository.delete(id);
      if(res){
        return res
      }
      throw res
    }catch(Exception){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
        description:"algo inesperado aconteçeu, verifique: "+`${Exception}`
      })
    }
  }

  public async updateById(id:string, body: UpdateDto) {
    try{
      const res = await this.repository.update(id, { ...body as any });
      if(res){
        return res
      }
    }catch(Exception){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
        description:"algo aconteceu em atualizar updateAmFollowing"+` ::: ${Exception}`
      })
    }
  }

  public async validateID(id:string, userId:string){
    try{
      const res = await this.repository.findOne({ where:{ id: id, user_id:userId }})
      if(res){
        return true
      }
      throw 'conflict'
    }catch(Exception){
      if(Exception == 'conflict'){
        throw new ConflictExceptions({
          code:code.DATA_CONFLICT,
          message:message.DATA_CONFLICT,
          method:this.request.url,
          path:this.request.method,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
        description:"algo inesperado aconteçeu, verifique: "+`${Exception}`
      })
    }
  }
  
}

