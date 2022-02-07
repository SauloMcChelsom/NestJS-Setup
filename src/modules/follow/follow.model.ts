import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { code, message } from '@root/src/lib/enum';
import { IsValidTimestampService } from '@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/lib/utility/empty/empty.service';
import { FollowRepository } from './follow.repository';
import { CreateInterface } from './interface';

export class FollowModel {
  constructor(
    @InjectRepository(FollowRepository)
    private readonly repository: FollowRepository,
    private isValidTimestamp: IsValidTimestampService,
    private empty: EmptyService,
  ) {}

  public async listAllUserFollowPageByIdOfPage(
    userId: number,
    search = '',
    limit = 3,
    offset = 0,
    order = 'ASC',
    column = 'id',
    start = '',
    end = '',
  ) {
    try {
      if (limit > 15) {
        limit = 15;
      }

      if (this.empty.run(column)) {
        column = 'id';
      }

      if (!(order === 'ASC' || order === 'DESC')) {
        order = 'ASC';
      }

      if (start) {
        start = this.isValidTimestamp.run(start);
      }

      if (end) {
        end = this.isValidTimestamp.run(end);
      }

      const res = await this.repository.listAllUserFollowPageByIdOfPage(
        userId,
        limit,
        offset,
        order,
        column,
        start,
        end
      );
      const count = await this.repository.countListAllUserFollowPageByIdOfPage(
        userId,
        start,
        end
      );

      if (Object.keys(res).length != 0) {
        return { res: res, count: count };
      }

      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async listAllPageUserFollowByIdOfUser(
    userId: number,
    search = '',
    limit = 3,
    offset = 0,
    order = 'ASC',
    column = 'id',
    start = '',
    end = '',
  ) {
    try {
      if (limit > 15) {
        limit = 15;
      }

      if (this.empty.run(column)) {
        column = 'id';
      }

      if (!(order === 'ASC' || order === 'DESC')) {
        order = 'ASC';
      }

      if (start) {
        start = this.isValidTimestamp.run(start);
      }

      if (end) {
        end = this.isValidTimestamp.run(end);
      }

      const res = await this.repository.listAllPageUserFollowByIdOfUser(
        userId,
        limit,
        offset,
        order,
        column,
        start,
        end,
      );
      const count = await this.repository.countListAllPageUserFollowByIdOfUser(
        userId,
        start,
        end,
      );

      if (Object.keys(res).length != 0) {
        return { res: res, count: count };
      }

      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async userAlreadyFollowPage(userId: string, pageId: string) {
    try {
      const res = await this.repository.findOne({
        where: { user_id: userId, page_id: pageId },
      });
      if (res) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500);
    }
  }

  public async getPageUserFollow(userId: string, pageId: string) {
    try {
      const res = await this.repository.findOne({
        where: { user_id: userId, page_id: pageId },
      });
      if (res) {
        return res;
      }

      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async findByIdPage(id: string) {
    try {
      const res = await this.repository.find({
        where: { page_id: id, i_am_following: true },
      });
      if (res) {
        return res;
      }

      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async findByIdUser(id: string) {
    try {
      const res = await this.repository.find({
        where: { user_id: id, i_am_following: true },
      });
      if (res) {
        return res;
      }

      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async updateAmFollowing(id: string, body: any) {
    try {
      const res = await this.repository.update(id, body);
      if (res) {
        return res;
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500);
    }
  }

  public async save(body: CreateInterface) {
    body.i_am_following = true;
    return await this.repository.save(body);
  }
}
