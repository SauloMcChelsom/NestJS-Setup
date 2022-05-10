import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/shared/utility/empty/empty.service';
import { code, message } from '@root/src/shared/enum';

import { PublicationEntityRepository } from './publication-entity.repository';
import { CreatePublication, UpdatePublication } from '@shared/interfaces/publication.interface';

@Injectable()
export class PublicationEntityModel {
  constructor(
    @InjectRepository(PublicationEntityRepository)
    private readonly repository: PublicationEntityRepository,
    private isValidTimestamp: IsValidTimestampService,
    private empty: EmptyService,
  ) {}

  public async incrementLikes(id: any) {
    try {
      const publication = await this.repository.findOne({
        where: { id: id } 
      }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (typeof publication?.number_of_likes == 'number') {
        publication.number_of_likes++;
        await this.repository.update(publication.id, {
          number_of_likes: publication.number_of_likes,
        });
      }

      throw new HttpException({
        code : code.DATA_CONFLICT,
        message : 'not find increment likes for user',
        description : '',
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async incrementComment(id: any) {
    try {

      const publication = await this.repository.findOne({ 
        where: { id: id } 
      }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (typeof publication?.number_of_comments == 'number') {
        publication.number_of_comments++;
        await this.repository.update(publication.id, {
          number_of_comments: publication.number_of_comments,
        });
      }

      throw new HttpException({
        code : code.DATA_CONFLICT,
        message : 'not find increment comment for user',
        description : '',
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async decrementComment(id: any) {
    try {

      const publication = await this.repository.findOne({ 
        where: { id: id } 
      }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (typeof publication?.number_of_comments == 'number') {
        publication.number_of_comments--;
        await this.repository.update(publication.id, {
          number_of_comments: publication.number_of_comments,
        });
      }

      throw new HttpException({
        code : code.DATA_CONFLICT,
        message : 'not find decrement comment for user',
        description : '',
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async decrementLikes(id: any) {
    try {

      const publication = await this.repository.findOne({ 
        where: { id: id } 
      }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (typeof publication?.number_of_likes == 'number') {
        publication.number_of_likes--;
        await this.repository.update(publication.id, {
          number_of_likes: publication.number_of_likes,
        });
      }

      throw new HttpException({
        code : code.DATA_CONFLICT,
        message : 'not find decrement likes for user',
        description : '',
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async findOneById(id: number) {
    try {

      const res = await this.repository.findOne({ where: { id: id } }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return res
      }

      throw new HttpException({
        code : code.DATA_CONFLICT,
        message : 'not find One by id',
        description : '',
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async listFeed(
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

      const res = await this.repository.listFeed(
        limit,
        offset,
        order,
        column,
        start,
        end,
      );
      const count = await this.repository.countListFeed(search, start);

      if (Object.keys(res).length != 0) {
        return { res: res, count: count };
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found list feed',
        description : ''
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async searchByText(
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

      const res = await this.repository.listSearchByText(
        search,
        limit,
        offset,
        order,
        column,
        start,
        end,
      );
      const count = await this.repository.countListSearchByText(
        search,
        start,
        end,
      );

      if (Object.keys(res).length != 0) {
        return { res: res, count: count };
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found list search by text',
        description : ''
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async create(body: any) {
    body.number_of_likes = 0;
    return await this.repository.save(body).catch((err) => {
      throw new HttpException({
        code : code.QUERY_FAILED,
        message : `${err.detail || err.hint || err.routine}`,
        description : ''
      }, HttpStatus.BAD_REQUEST)
    })
  }

  public async updateById(id: number, body: UpdatePublication){
    try {
      const res = await this.repository.update(id, { ...(body as any) }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ``,
        }, HttpStatus.BAD_REQUEST)
      })

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
      throw new HttpException(e.response, e.status)
    }
  }

  public async incrementNumberLikeOfPublication(id: any) {
    await this.incrementLikes(id);
  }

  public async decrementNumberLikeOfPublication(id: any) {
    await this.decrementLikes(id);
  }

  public async incrementNumberCommentOfPublication(id: any) {
    await this.incrementComment(id);
  }

  public async decrementNumberCommentfPublication(id: any) {
    await this.decrementComment(id);
  }
}
