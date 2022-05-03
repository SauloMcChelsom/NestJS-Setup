import { Injectable } from '@nestjs/common'

import { ListFilter } from '@root/src/shared/interfaces/classification.interface'
import { PageEntityModel } from '@model/page-entity/page-entity.model'
import { CreatePage, UpdatePage } from '@shared/interfaces/page.interface'

@Injectable()
export class PageService {
  constructor(private page: PageEntityModel) {}

  public async create(body: CreatePage) {
    return await this.page.create(body)
  }

  public async authFindOneByName(name: string) {
    return await this.page.findOneByName(name)
  }

  public async publicfindOneByName(name: string) {
    return await this.page.findOneByName(name)
  }

  public async authFindOneById(id: number) {
    return await this.page.findOneById(id)
  }

  public async publicfindOneById(id: number) {
    return await this.page.findOneById(id)
  }

  public async authListAll(cls: ListFilter) {
    return await this.page.listAll(
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    )
  }

  public async publicListAll(cls: ListFilter) {
    return await this.page.listAll(
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    )
  }

  public async update(body: UpdatePage) {
    return await this.page.updatePage(body)
  }

  public async incrementNumberFollowersPage(id: number) {
    await this.page.increment(id)
  }

  public async decrementNumberFollowersPage(id: number) {
    await this.page.decrement(id)
  }
}
