import { Injectable, Inject, Scope } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { code, message } from '@shared/enum'
import { UtilityService } from "@shared/model/utility/utility.service"
import { OK, InternalServerErrorExceptions, NotFoundExceptions, ConflictExceptions, Exception } from '@service/exception'
import { CommentRepository } from './comment.repository'

import { UpdateDto } from './dto/update.dto'

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ILike } from "typeorm";

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


  public async findByUserId(userId:string, search:string='', limit:number=3, offset:number=0, order:string='ASC', column:string='id', start:string='', end:string=''){
    try{
    
      if(this.utility.empty(column)){
        column = "id"
      }

      if(!(order === "ASC" || order === "DESC")){
        order = "ASC"
      }

      if(start){
        start = this.utility.isValidTimestamp(start)
      }

      if(end){
        end = this.utility.isValidTimestamp(end)
      }
      
      const res = await this.repository.listCommentByUserId(userId, search, limit, offset, order, column, start, end)
      const count = await this.repository.getCount(userId, search, start, end)
 
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

