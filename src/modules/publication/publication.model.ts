import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IsValidTimestampService } from '@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/lib/utility/empty/empty.service';
import { code, message } from '@root/src/lib/enum';

import { PublicationRepository } from './publication.repository';
import { UpdateInterface } from './interface';

export class PublicationModel {
  constructor(
    @InjectRepository(PublicationRepository)
    private readonly repository: PublicationRepository,
    private isValidTimestamp: IsValidTimestampService,
    private empty: EmptyService,
  ) {}

  public async incrementLikes(id: any) {
    try {
      const publication = await this.repository.findOne({ where: { id: id } });
      if (typeof publication?.number_of_likes == 'number') {
        publication.number_of_likes++;
        await this.repository.update(publication.id, {
          number_of_likes: publication.number_of_likes,
        });
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500);
    }
  }

  public async incrementComment(id: any) {
    try {
      const publication = await this.repository.findOne({ where: { id: id } });
      if (typeof publication?.number_of_comments == 'number') {
        publication.number_of_comments++;
        await this.repository.update(publication.id, {
          number_of_comments: publication.number_of_comments,
        });
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500);
    }
  }

  public async decrementComment(id: any) {
    console.log(id);
    try {
      const publication = await this.repository.findOne({ where: { id: id } });
      if (typeof publication?.number_of_comments == 'number') {
        publication.number_of_comments--;
        await this.repository.update(publication.id, {
          number_of_comments: publication.number_of_comments,
        });
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500);
    }
  }

  public async decrementLikes(id: any) {
    try {
      const publication = await this.repository.findOne({ where: { id: id } });
      if (typeof publication?.number_of_likes == 'number') {
        publication.number_of_likes--;
        await this.repository.update(publication.id, {
          number_of_likes: publication.number_of_likes,
        });
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500);
    }
  }

  public async findOneById(id: number) {
    try {
      const res = await this.repository.findOne({ where: { id: id } });
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
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
        search,
        limit,
        offset,
        order,
        column,
        start,
        end,
      );
      const count = await this.repository.countListFeed(search, start, end);

      if (Object.keys(res).length != 0) {
        return { res: res, count: count };
      }

      throw new HttpException(code.NOT_FOUND, 404);
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

      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async create(body: any) {
    try {
      const res = await this.repository.save(body);
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async update(id: number, body: UpdateInterface) {
    try {
      const res = await this.repository.update(id, { ...(body as any) });
      if (res) {
        return res;
      }
    } catch (e) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500);
    }
  }

  public validateSearchByText(text: any) {
    if (typeof text === 'number') {
      return new HttpException(code.NOT_FOUND, 404);
    }
    if (typeof text !== 'string') {
      return new HttpException(code.NOT_FOUND, 404);
    }
    text = text.trim();
    switch (text) {
      case '':
      case null:
      case undefined:
        return new HttpException(code.NOT_FOUND, 404);
      default:
        return false;
    }
  }
}
