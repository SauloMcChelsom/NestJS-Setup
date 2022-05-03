import { HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PageEntityModel } from '@model/page-entity/page-entity.model'

import { code, message } from '@root/src/shared/enum'
import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service'
import { EmptyService } from '@root/src/shared/utility/empty/empty.service'
import { FollowEntityRepository } from './follow-entity.repository'
import { CreateFollow, Follow } from '@shared/interfaces/follow.interface'

export class FollowEntityModel {

  constructor(
    @InjectRepository(FollowEntityRepository)
    private readonly repository: FollowEntityRepository,
    private isValidTimestamp: IsValidTimestampService,
    private empty: EmptyService,
    private page: PageEntityModel
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
        limit = 15
      }

      if (this.empty.run(column)) {
        column = 'id'
      }

      if (!(order === 'ASC' || order === 'DESC')) {
        order = 'ASC'
      }

      if (start) {
        start = this.isValidTimestamp.run(start)
      }

      if (end) {
        end = this.isValidTimestamp.run(end)
      }

      const res = await this.repository.listAllUserFollowPageByIdOfPage(
        userId,
        limit,
        offset,
        order,
        column,
        start,
        end,
      )
      const count = await this.repository.countListAllUserFollowPageByIdOfPage(
        userId,
        start,
        end,
      )

      if (Object.keys(res).length != 0) {
        return { res: res, count: count }
      }

      throw new HttpException(code.NOT_FOUND, 404)
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
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
        limit = 15
      }

      if (this.empty.run(column)) {
        column = 'id'
      }

      if (!(order === 'ASC' || order === 'DESC')) {
        order = 'ASC'
      }

      if (start) {
        start = this.isValidTimestamp.run(start)
      }

      if (end) {
        end = this.isValidTimestamp.run(end)
      }

      const res = await this.repository.listAllPageUserFollowByIdOfUser(
        userId,
        limit,
        offset,
        order,
        column,
        start,
        end,
      )
      const count = await this.repository.countListAllPageUserFollowByIdOfUser(
        userId,
        start,
        end,
      )

      if (Object.keys(res).length != 0) {
        return { res: res, count: count }
      }

      throw new HttpException(code.NOT_FOUND, 404)
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async userAlreadyFollowPage(userId: string, pageId: string) {
    try {
      const res = await this.repository.findOne({
        where: { user_id: userId, page_id: pageId },
      })
      if (res) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500)
    }
  }

  public async getPageUserFollow(userId: string, pageId: string) {
    try {
      const res = await this.repository.findOne({
        where: { user_id: userId, page_id: pageId },
      })
      if (res) {
        return res
      }

      throw new HttpException(code.NOT_FOUND, 404)
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async findByIdPage(id: string) {
    try {
      const res = await this.repository.find({
        where: { page_id: id, i_am_following: true },
      })
      if (res) {
        return res
      }

      throw new HttpException(code.NOT_FOUND, 404)
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async findByIdUser(id: string) {
    try {
      const res = await this.repository.find({
        where: { user_id: id, i_am_following: true },
      })
      if (res) {
        return res
      }

      throw new HttpException(code.NOT_FOUND, 404)
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async updateAmFollowing(id: string, body: any) {
    try {
      const res = await this.repository.update(id, body)
      if (res) {
        return res
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500)
    }
  }

  public async save(body: CreateFollow) {
    body.i_am_following = true
    return await this.repository.save(body)
  }

  public async create(body: CreateFollow) {
    //verificar se o usuario ja seguiu a pagina
    const follow = await this.userAlreadyFollowPage(
      body.user_id.toString(),
      body.page_id.toString(),
    );

    if (follow) {
      //se houver registro,  verifica se esta seguindo
      const segments = await this.getPageUserFollow(
        body.user_id.toString(),
        body.page_id.toString(),
      );
      if (segments.i_am_following) {
        //se sim, atualiza para 'para de seguir' e atualizar o contator na tabela page para --
        await this.updateAmFollowing(segments.id.toString(), {
          i_am_following: false,
        });
        await this.page.decrementNumberFollowersPage(segments.page_id);
        return await this.getPageUserFollow(
          body.user_id.toString(),
          body.page_id.toString(),
        );
      } else {
        //se não, atualizar para 'começar a seguir' e atualizar o contator na tabela page ++
        await this.updateAmFollowing(segments.id.toString(), {
          i_am_following: true,
        });
        await this.page.incrementNumberFollowersPage(segments.page_id);
        return await this.getPageUserFollow(
          body.user_id.toString(),
          body.page_id.toString(),
        );
      }
    } else {
      //se não houver registro, criar um registro ja seguindo e atualizar o contator na tabela page ++
      await this.save(body);
      const segments = await this.getPageUserFollow(
        body.user_id.toString(),
        body.page_id.toString(),
      );
      await this.page.incrementNumberFollowersPage(segments.page_id);
      return await this.getPageUserFollow(
        body.user_id.toString(),
        body.page_id.toString(),
      );
    }
  }
}
