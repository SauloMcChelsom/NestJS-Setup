import { Injectable, Inject, Scope } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { code, message } from '@shared/enum'
import { UtilityService } from "@shared/model/utility/utility.service"
import { OK, InternalServerErrorExceptions, NotFoundExceptions, Exception } from '@root/src/shared/exception/exception'

import { FollowRepository } from './follow.repository'
import { CreateInterface } from './interface'

@Injectable({ scope: Scope.REQUEST })
export class FollowModel {

  constructor(
    @InjectRepository(FollowRepository) private readonly repository: FollowRepository,
    @Inject(REQUEST) private readonly request: Request,
    private utility:UtilityService
  ){}

  public async listAllUserFollowPageByIdOfPage(userId:number, search:string='', limit:number=3, offset:number=0, order:string='ASC', column:string='id', start:string='', end:string=''){
    try{

      if(limit > 15){
        limit = 15
      }
    
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
      
      const res = await this.repository.listAllUserFollowPageByIdOfPage(userId, search, limit, offset, order, column, start, end)
      const count = await this.repository.countListAllUserFollowPageByIdOfPage(userId, search, start, end)
 
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
               
  public async listAllPageUserFollowByIdOfUser(userId:number, search:string='', limit:number=3, offset:number=0, order:string='ASC', column:string='id', start:string='', end:string=''){
    try{

      if(limit > 15){
        limit = 15
      }
    
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
                                        
      const res = await this.repository.listAllPageUserFollowByIdOfUser(userId, search, limit, offset, order, column, start, end)
      const count = await this.repository.countListAllPageUserFollowByIdOfUser(userId, search, start, end)
 
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

  public async userAlreadyFollowPage(userId:string, pageId:string) {
    try{
      const res = await this.repository.findOne({ where:{ user_id: userId, page_id:pageId }})
      if(res){
        return true
      }else{
        return false
      }
    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC
      })
    }
  }

  public async getPageUserFollow(userId:string, pageId:string) {
    try{
      const res = await this.repository.findOne({ where:{ user_id: userId, page_id:pageId }})
      if(res){
        return res
      }
      
      throw new NotFoundExceptions({
        code:code.NOT_FOUND_USER,
        message:message.NOT_FOUND_USER,
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

  public async findByIdPage(id:string) {
    try{
        const res = await this.repository.find({ where:{ page_id: id, i_am_following: true }})
      if(res){
        return res
      }
      
      throw new NotFoundExceptions({
        code:code.NOT_FOUND_USER,
        message:message.NOT_FOUND_USER,
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

  public async findByIdUser(id:string) {
    try{
        const res = await this.repository.find({ where:{ user_id: id, i_am_following: true }})
      if(res){
        return res
      }

      throw new NotFoundExceptions({
        code:code.NOT_FOUND_USER,
        message:message.NOT_FOUND_USER,
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

  public async updateAmFollowing(id:string, body:any) {
    try{
      const res = await this.repository.update(id, body);
      if(res){
        return res
      }
    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC
      })
    }
  }

  public async save(body:CreateInterface) {
    body.i_am_following = true
    return await this.repository.save(body)
  }
}

