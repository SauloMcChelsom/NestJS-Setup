import { Injectable } from '@nestjs/common'

import { ClassificationInterface } from '@shared/interfaces'
import { OK } from '@service/exception'
import { code, message } from '@shared/enum'

import { PageModel } from './page.model'
import { CreateInterface, UpdateInterface } from './interface'
import { 
  CreateMapper, 
  AuthListMapper, 
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper
} from './mapper'

@Injectable()
export class PageService {

  constructor(
    private model:PageModel,
    private createMapper:CreateMapper, 
    private authListMapper:AuthListMapper, 
    private publicListMapper:PublicListMapper,
    private authFindOneMapper:AuthFindOneMapper,
    private publicFindOneMapper:PublicFindOneMapper
  ) {}

  public async create(body:CreateInterface) {
    await this.model.pageAlreadyExist(body.page_name)
    body.number_of_followers = 0
    const res = await this.model.create(body)
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  public async authFindOneByName(name:string) {
    const res = await this.model.findOneByName(name)
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicfindOneByName(name:string) {
    const res = await this.model.findOneByName(name)
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async authFindOneById(id:number) {
    const res = await this.model.findOneById(id)
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicfindOneById(id:number) {
    const res = await this.model.findOneById(id)
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async authListAll(cls:ClassificationInterface) {
    const res = await this.model.listAll(cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end);
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicListAll(cls:ClassificationInterface) {
    const res = await this.model.listAll(cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end);
    const dto = res.map((r)=> this.publicListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async update(body:UpdateInterface) {
    await this.model.findPageByIdOfUserAndIdOfPage(body.user_id.toString(), body.id.toString())
    await this.model.update(body.id, body);
    const res = await this.model.findOneById(body.id)
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

  public async incrementNumberFollowersPage(id:number) {
    await this.model.increment(id)
  }

  public async decrementNumberFollowersPage(id:number) { 
    await this.model.decrement(id)
  }

}

