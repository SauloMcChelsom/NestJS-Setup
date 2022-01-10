import { Injectable } from '@nestjs/common'

import { OK } from '@service/exception'
import { code, message } from '@shared/enum'
import { ClassificationInterface } from '@shared/interfaces'

import { CommentModel } from './comment.model'
import { CreateInterface, UpdateInterface } from './interface'
import { 
  CreateMapper, 
  AuthListMapper, 
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper,
  UpdateMapper
} from './mapper'

@Injectable()
export class CommentService {

  constructor(
    private model: CommentModel, 
    private createMapper:CreateMapper, 
    private authListMapper:AuthListMapper, 
    private publicListMapper:PublicListMapper,
    private authFindOneMapper:AuthFindOneMapper,
    private publicFindOneMapper:PublicFindOneMapper,
    private updateMapper:UpdateMapper
  ) {}

  public async authListByUserId(id:string, cls:ClassificationInterface){
    let  res  = await this.model.listByUserId(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end)
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicListByUserId(id:string, cls:ClassificationInterface){
    const  res = await this.model.listByUserId(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end)
    const dto = res.map((r)=> this.publicListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicListByPublicationId(id:string, cls:ClassificationInterface){
    let res = await this.model.listByPublicationId(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end)
    const dto = res.map((r)=> this.publicListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async authFindOneById(id:string, userId:string){
    await this.model.validateID(id, userId)
    let res = await this.model.findOneById(id)
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicFindOneById(id:string){
    let res = await this.model.findOneById(id)
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async create(body:CreateInterface) {
    let create = await this.model.create(body)
    let res = await this.model.findOneById(create.id)
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async update(body:UpdateInterface) {
    await this.model.validateID(body.id.toString(), body.user_id.toString())
    await this.model.updateById(body.id, body)
    let res = await this.model.findOneById(body.id.toString())
    const dto = this.updateMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

  public async delete(id:string, userId:string){
    await this.model.validateID(id, userId)
    await this.model.deleteById(id);
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }

}