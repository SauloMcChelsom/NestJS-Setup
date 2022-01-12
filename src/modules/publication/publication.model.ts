import { Injectable, Inject, Scope } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { UtilityService } from "@shared/model/utility/utility.service"
import { code, message } from '@shared/enum'
import { OK, InternalServerErrorExceptions, NotFoundExceptions, Exception } from '@service/exception'

import { PublicationRepository } from './publication.repository'
import { UpdateInterface } from './interface'

@Injectable({ scope: Scope.REQUEST })
export class PublicationModel {

    constructor(
        @InjectRepository(PublicationRepository) private readonly repository: PublicationRepository,
        @Inject(REQUEST) private readonly request: Request,
        private utility:UtilityService
    ) {}

    
    public async incrementLikes(id:any) {
        try{
            let publication = await this.repository.findOne({ where:{ id: id }})
            if(typeof publication?.number_of_likes == "number"){
                publication.number_of_likes++ 
                await this.repository.update(publication.id, { number_of_likes: publication.number_of_likes });
            }
        }catch(error){
            throw new InternalServerErrorExceptions({
                code:code.ERROR_GENERIC,
                message:message.ERROR_GENERIC,
                method:this.request.url,
                path:this.request.method
            })
        }
    }

    public async incrementComment(id:any) {
      try{
          let publication = await this.repository.findOne({ where:{ id: id }})
          if(typeof publication?.number_of_comments == "number"){
              publication.number_of_comments++ 
              await this.repository.update(publication.id, { number_of_comments: publication.number_of_comments });
          }
      }catch(error){
          throw new InternalServerErrorExceptions({
              code:code.ERROR_GENERIC,
              message:message.ERROR_GENERIC,
              method:this.request.url,
              path:this.request.method
          })
      }
    }

    public async decrementComment(id:any) { 
      console.log(id)
      try{
          let publication = await this.repository.findOne({ where:{ id: id }})
          if(typeof publication?.number_of_comments == "number"){
              publication.number_of_comments--
              await this.repository.update(publication.id, { number_of_comments: publication.number_of_comments });
          }
      }catch(error){
          throw new InternalServerErrorExceptions({
              code:code.ERROR_GENERIC,
              message:message.ERROR_GENERIC,
              method:this.request.url,
              path:this.request.method
          })
      }
  }

    public async decrementLikes(id:any) { 
        try{
            let publication = await this.repository.findOne({ where:{ id: id }})
            if(typeof publication?.number_of_likes == "number"){
                publication.number_of_likes--
                await this.repository.update(publication.id, { number_of_likes: publication.number_of_likes });
            }
        }catch(error){
            throw new InternalServerErrorExceptions({
                code:code.ERROR_GENERIC,
                message:message.ERROR_GENERIC,
                method:this.request.url,
                path:this.request.method
            })
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
    
    public async listFeed(search:string='', limit:number=3, offset:number=0, order:string='ASC', column:string='id', start:string='', end:string=''){
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
          
          const res = await this.repository.listFeed(search, limit, offset, order, column, start, end)
          const count = await this.repository.countListFeed(search, start, end)
     
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

    public async searchByText(search:string='', limit:number=3, offset:number=0, order:string='ASC', column:string='id', start:string='', end:string=''){
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
          
          const res = await this.repository.listSearchByText(search, limit, offset, order, column, start, end)
          const count = await this.repository.countListSearchByText(search, start, end)
     
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

    public validateSearchByText(text:any){
        if(typeof(text) === "number"){
            return  new NotFoundExceptions({
                code:code.NOT_FOUND,
                message:message.NOT_FOUND,
                method:this.request.url,
                path:this.request.method
            })
        }
        if(typeof(text) !== "string"){
            return  new NotFoundExceptions({
                code:code.NOT_FOUND,
                message:message.NOT_FOUND,
                method:this.request.url,
                path:this.request.method
            })
        }
        text = text.trim() 
        switch (text) {
            case "":
            case null:
            case undefined:
            return  new NotFoundExceptions({
                code:code.NOT_FOUND,
                message:message.NOT_FOUND,
                method:this.request.url,
                path:this.request.method
            })
            default:
            return false;
        }
    }
}
