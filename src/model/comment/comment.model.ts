import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CommentEntity } from '@entity/comment.entity';
import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/shared/utility/empty/empty.service';
import { code } from '@root/src/shared/enum';

import { CommentRepository } from './comment.repository';
import { UpdateComment, CreateComment, ListComment } from '@shared/interfaces/comment.interface';

export class CommentModel {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly  repository_custom: CommentRepository,

    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
    
    private isValidTimestamp: IsValidTimestampService,
    private empty: EmptyService,
  ) {}

  public async create(body: CreateComment): Promise<CommentEntity> {
    return await this.repository.save(body).catch((err) => {
      throw new HttpException({
        code : code.QUERY_FAILED,
        message : `${err}`,
        description : ''
      }, HttpStatus.BAD_REQUEST)
    });
  }

  public async updateById(id: number, body: UpdateComment): Promise<any> {
    try {
      const res = await this.repository.update(id, { ...(body as any) }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      });

      if(!res){
        throw new HttpException({
          code : code.NOT_FOUND,
          message : 'update, id not found',
          description : ''
        }, HttpStatus.NOT_FOUND)
      }

      if (res.affected == 1) {
        return {
          code : code.SUCCESSFULLY_UPDATED,
          message : 'update with sucess',
          description : ''
        };
      }

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async deleteById(id: number) {
    try {

      const res = await this.repository.delete(id).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      });

      if(!res){
        throw new HttpException({
          code : code.NOT_FOUND,
          message : 'delete, id not found',
          description : ''
        }, HttpStatus.NOT_FOUND)
      }

      if (res.affected == 1) {
        return {
          code : code.SUCCESSFULLY_DELETED,
          message : 'delete with sucess',
          description : ''
        };
      }

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async findOneById(id: number) {
    try {

      const res = await this.repository.findOne(id).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return res;
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found find one by id',
        description : ''
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async idEqualsUserId(id: number, userId: number) {
    try {

      const res = await this.repository.findOne({
        where: { id: id, user_id: userId },
      }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return true;
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'ids diferentes',
        description : ''
      }, HttpStatus.NOT_FOUND);
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
        return<ListComment> { res: res, count: count }
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found list',
        description : ''
      }, HttpStatus.NOT_FOUND);
      
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

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found list by publication id',
        description : ''
      }, HttpStatus.NOT_FOUND)
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }
}
