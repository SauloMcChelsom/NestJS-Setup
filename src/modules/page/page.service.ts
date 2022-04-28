import { Injectable } from '@nestjs/common';

import { ClassificationInterface } from '@root/src/shared/interfaces';

import { PageModel } from './page.model';
import { CreateInterface, UpdateInterface } from './interface';

@Injectable()
export class PageService {
  constructor(private model: PageModel) {}

  public async create(body: CreateInterface) {
    await this.model.pageAlreadyExist(body.page_name);
    body.number_of_followers = 0;
    return await this.model.create(body);
  }

  public async authFindOneByName(name: string) {
    return await this.model.findOneByName(name);
  }

  public async publicfindOneByName(name: string) {
    return await this.model.findOneByName(name);
  }

  public async authFindOneById(id: number) {
    return await this.model.findOneById(id);
  }

  public async publicfindOneById(id: number) {
    return await this.model.findOneById(id);
  }

  public async authListAll(cls: ClassificationInterface) {
    return await this.model.listAll(
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async publicListAll(cls: ClassificationInterface) {
    return await this.model.listAll(
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async update(body: UpdateInterface) {
    await this.model.findPageByIdOfUserAndIdOfPage(
      body.user_id.toString(),
      body.id.toString(),
    );
    await this.model.update(body.id, body);
    return await this.model.findOneById(body.id);
  }

  public async incrementNumberFollowersPage(id: number) {
    await this.model.increment(id);
  }

  public async decrementNumberFollowersPage(id: number) {
    await this.model.decrement(id);
  }
}
