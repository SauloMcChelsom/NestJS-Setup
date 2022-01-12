import { Injectable, Inject, Scope } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { code, message } from '@shared/enum'
import { 
  InternalServerErrorExceptions,
  Exception,
  NotFoundExceptions
} from '@service/exception'

import { LikeRepository } from './like.repository'
import { CreateInterface } from './interface/create.interface'


@Injectable({ scope: Scope.REQUEST })
export class LikeModel {

  constructor(
    @InjectRepository(LikeRepository) private readonly repository: LikeRepository,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async save(body:CreateInterface){
    try{
      await this.repository.save(body)
    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
      })
    }
  }

  public async userAlreadyLikePublication(publicationId:string, userId:string){
    try{
      const res = await this.repository.findOne({ where:{ publication_id: publicationId, user_id:userId }})

      if(res){
        return true
      }else{
        return false
      }

    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
      })
    }
  }

  public async validatePublicationExists(publicationId:number){
    try{
      const res = await this.repository.findOne({ where:{ publication_id: publicationId }})

      if(res){
        return true
      }

      throw new NotFoundExceptions({
        code:code.NOT_FOUND,
        message:message.NOT_FOUND,
      })

    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
      })
    }
  }

  public async getLike(publication_id:string, userId:string){
    try{
      const res = await this.repository.findOne({ where:{ publication_id: publication_id, user_id:userId }})
      if(res){
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

  public async updateLike(id:string, body:any){
    try{
      const res = await this.repository.update(id, body);
      if(res){
        return res
      }
    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method,
      })
    }
  }
}

