import { Injectable, Inject, Scope } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { UtilityService } from "@shared/model/utility/utility.service"
import { code, message } from '@shared/enum'
import { OK, InternalServerErrorExceptions, NotFoundExceptions, ConflictExceptions, Exception } from '@root/src/shared/exception/exception'

import { PageRepository } from './page.repository'
import { UpdateInterface } from './interface'
import { CreateInterface } from './interface'


@Injectable({ scope: Scope.REQUEST })
export class PageModel {

  constructor(
    @InjectRepository(PageRepository) private readonly repository: PageRepository,
    @Inject(REQUEST) private readonly request: Request,
    private utility:UtilityService
  ) {}

  public async create(body:CreateInterface){
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

  public async findOneByName(name:string){
    try{
      const res = await this.repository.findOne({ where:{ page_name: name }})
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
      const res = await this.repository.findOne({ where:{ id: id }})
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

  public async listAll(search:string='', limit:number=3, offset:number=0, order:string='ASC', column:string='id', start:string='', end:string=''){
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
      
      const res = await this.repository.listAll(search, limit, offset, order, column, start, end)
      const count = await this.repository.countListAll(search, start, end)
 
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

  public async update(id:number, body: UpdateInterface) { 
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
        path:this.request.method
      })
    }
  }

  public async pageAlreadyExist(name:string) {
    try{
      const res = await this.repository.findOne({ where:{ page_name: name }})
      if(res){
        throw new ConflictExceptions({
          code:code.PAGE_ALREADY_IN_USE,
          message:message.PAGE_ALREADY_IN_USE,
        })
      }
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

  public async findPageByIdOfUserAndIdOfPage(userId:string, pageId:string) {
    try{
      const res = await this.repository.findOne({ where:{ user_id: userId, id:pageId }})
      if(res){
        return res
      }
     
      throw new ConflictExceptions({
        code:code.DATA_CONFLICT,
        message:"id do usuario e id da pagina, não coincide como chave composta",
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

  public async increment(id:any) {
    try{
      let page = await this.repository.findOne({ where:{ id: id }})

      if(typeof page?.number_of_followers == "number"){
        page.number_of_followers++ 
        await this.repository.update(page.id, { number_of_followers: page.number_of_followers });
      }

    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC
      })
    }
  }

  public async decrement(id:any) { 
    try{
      let page = await this.repository.findOne({ where:{ id: id }})

      if(typeof page?.number_of_followers == "number"){
        page.number_of_followers--
        await this.repository.update(page.id, { number_of_followers: page.number_of_followers });
      }
      
    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC
      })
    }
  }
}

