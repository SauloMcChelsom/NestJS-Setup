import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CommentEntity } from '@entity/comment.entity';
import { IsValidTimestampService } from '@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/lib/utility/empty/empty.service';
import { code } from '@root/src/lib/enum';

import { CommentRepository } from './comment.repository';
import { UpdateInterface } from './interface';

export class CommentModel {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly  repository_custom: CommentRepository,

    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
    
    private isValidTimestamp: IsValidTimestampService,
    private empty: EmptyService,
  ) {}

  public async create(body: any): Promise<CommentEntity> {
    try {
      return await this.repository.save(body);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOneById(id: number) {
    try {
      const res = await this.repository.findOne(id);
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async listByUserId(
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

      const res = await this.repository_custom.listByUserId(
        userId,
        search,
        limit,
        offset,
        order,
        column,
        start,
        end,
      );
      const count = await this.repository_custom.countListByUserId(
        userId,
        search,
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

  public async listByPublicationId(
    publicationId: number,
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

      const res = await this.repository_custom.listByPublicationId(
        publicationId,
        search,
        limit,
        offset,
        order,
        column,
        start,
        end,
      );
      const count = await this.repository_custom.countListByPublicationId(
        publicationId,
        search,
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

  public async deleteById(id: number) {
    try {
      const res = await this.repository.delete(id);
      if (res) {
        return res;
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async updateById(id: number, body: UpdateInterface) {
    try {
      const res = await this.repository.update(id, { ...(body as any) });
      if (res) {
        return res;
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async validateID(id: number, userId: number) {
    try {
      const res = await this.repository.findOne({
        where: { id: id, user_id: userId },
      });
      if (res) {
        return true;
      }
      throw new HttpException(code.DATA_CONFLICT, 409);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }
}
