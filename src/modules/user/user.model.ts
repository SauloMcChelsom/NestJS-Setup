import { Injectable, Inject, Scope } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { code, message } from '@shared/enum'
import { ConflictExceptions, BadRequestExceptions, NotFoundExceptions, Exception } from '@root/src/shared/exception/exception'

import { UserRepository } from './user.repository'
import { UpdateInterface, UpdateUserUidWithFirebaseUidInterface as UpdateUID } from './interface'

@Injectable({ scope: Scope.REQUEST })
export class UserModel {

  constructor(
    @InjectRepository(UserRepository) private readonly repository: UserRepository,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  public async emailAlreadyExist(email:string) {
    try{
      const res = await this.repository.findOne({ where:{ email: email }})
      if(res){
        throw new ConflictExceptions({
          code:code.EMAIL_ALREADY_IN_USE,
          message:message.EMAIL_ALREADY_IN_USE,
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

  public async uidAlreadyExist(uid:string) {
    try{
      const res = await this.repository.findOne({ where:{ uid: uid }})
      if(res){
        throw new ConflictExceptions({
          code:code.UID_ALREADY_IN_USE,
          message:message.UID_ALREADY_IN_USE,
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

  public async providersIsValid(providers:string) {
    try{
      if(providers == "google.com" || providers == "email_password"){
        return
      }
      throw new BadRequestExceptions({
        code:code.PROVIDERS_USER_IS_INVALID,
        message:message.PROVIDERS_USER_IS_INVALID,
        description:"usuario autenticou com o google.com ou email/senha? example: google ou email_password"
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

  public async getUserByUid(uid:string) {
    try{
      const res = await this.repository.findOne({ where:{ uid: uid }})
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

  public async getUserByEmail(email:string) {
    try{
      const res = await this.repository.findOne({ where:{ email: email }})
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

  public async updateUserByUid(id:number, body:UpdateInterface | UpdateUID) {
    try{
      const res = await this.repository.update(id, body)
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

  public async delete(id:number) {
    try{
      const res = await this.repository.delete(id)
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

  public async create(page:any){
    try{
      const res = await this.repository.save(page)
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
}

