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

  public async create(page:CreateInterface) {
    await this.model.pageAlreadyExist(page.page_name)
    page.number_of_followers = 0
    const res = await this.model.create(page)
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  public async authFindOneByName(page:string) {
    const res = await this.model.findOneByName(page)
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicfindOneByName(page:string) {
    const res = await this.model.findOneByName(page)
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

  public async update(page:UpdateInterface) {
    await this.model.findPageByIdOfUserAndIdOfPage(page.user_id.toString(), page.id.toString())
    await this.model.update(page.id, page);
    const res = await this.model.findOneById(page.id)
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

}

