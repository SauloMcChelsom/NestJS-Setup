import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/shared/utility/empty/empty.service';
import { code, message } from '@root/src/shared/enum';

import { PageRepository } from './page.repository';
import { UpdateInterface } from './interface';
import { CreateInterface } from './interface';

export class PageModel {
  constructor(
    @InjectRepository(PageRepository)
    private readonly repository: PageRepository,
    private isValidTimestamp: IsValidTimestampService,
    private empty: EmptyService,
  ) {}

  public async create(body: CreateInterface) {
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

  public async findOneByName(name: string) {
    try {
      const res = await this.repository.findOne({ where: { page_name: name } });
      if (res) {
        return res;
      }
      throw new HttpException(code.NOT_FOUND, 404);
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
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

  public async listAll(
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

      const res = await this.repository.listAll(
        search,
        limit,
        offset,
        order,
        column,
        start,
        end,
      );
      const count = await this.repository.countListAll(search, start, end);

      if (Object.keys(res).length != 0) {
        return { res: res, count: count };
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
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async pageAlreadyExist(name: string) {
    try {
      const res = await this.repository.findOne({ where: { page_name: name } });
      if (res) {
        throw new HttpException(code.PAGE_ALREADY_IN_USE, 409);
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async findPageByIdOfUserAndIdOfPage(userId: string, pageId: string) {
    try {
      const res = await this.repository.findOne({
        where: { user_id: userId, id: pageId },
      });
      if (res) {
        return res;
      }

      throw new HttpException(
        [
          code.DATA_CONFLICT,
          'id do usuario e id da pagina, não coincide como chave composta',
        ],
        409,
      );
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async increment(id: any) {
    try {
      const page = await this.repository.findOne({ where: { id: id } });

      if (typeof page?.number_of_followers == 'number') {
        page.number_of_followers++;
        await this.repository.update(page.id, {
          number_of_followers: page.number_of_followers,
        });
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500);
    }
  }

  public async decrement(id: any) {
    try {
      const page = await this.repository.findOne({ where: { id: id } });

      if (typeof page?.number_of_followers == 'number') {
        page.number_of_followers--;
        await this.repository.update(page.id, {
          number_of_followers: page.number_of_followers,
        });
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500);
    }
  }
}
