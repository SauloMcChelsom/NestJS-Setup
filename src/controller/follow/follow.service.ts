import { Injectable } from '@nestjs/common';

import { ListFilter } from '@root/src/shared/interfaces';
import { FollowEntityModel } from '@model/follow-entity/follow-entity.model';
import { CreateFollow } from '@shared/interfaces/follow.interface';

@Injectable()
export class FollowService {
  constructor(private follow: FollowEntityModel) {}

  public async authListByIdPage(id: number, cls: ListFilter) {
    return await this.follow.listAllUserFollowPageByIdOfPage(
      id,
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async authListByIdUser(id: number, cls: ListFilter) {
    return await this.follow.listAllPageUserFollowByIdOfUser(
      id,
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async create(body: CreateFollow) {
    return this.follow.create(body)
  }
}
