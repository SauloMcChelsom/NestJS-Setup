import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { PageEntity } from '@entity/page.entity';

import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service'
import { EmptyService } from '@root/src/shared/utility/empty/empty.service'
import { CreatePage, UpdatePage } from '@shared/interfaces/page.interface'
import { code, message } from '@root/src/shared/enum'

import { PageEntityRepository } from './page-entity.repository'

@Injectable()
export class PageEntityModel {

  constructor(
    @InjectRepository(PageEntityRepository)
    private readonly repository_custom: PageEntityRepository,
    
    @InjectRepository(PageEntity)
    private readonly repository: Repository<PageEntity>,

    private isValidTimestamp: IsValidTimestampService,
    private empty: EmptyService,
  ) {}

  public async findOneByName(name: string) {
    try {

      const res = await this.repository.findOne({ where: { page_name: name } }).catch((err) => {
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
        code:code.NOT_FOUND,
        message: message.NOT_FOUND,
        description: `A pagina "${name}" não foi encontrada, verifique acentos, espaço, aspas, imojes...`
    }, HttpStatus.NOT_FOUND)

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
        code:code.NOT_FOUND,
        message: message.NOT_FOUND,
        description: `not find one by id`
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async pageAlreadyExist(name: string) {
    try {
      const res = await this.repository.findOne({ 
        where: { page_name: name } 
      }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        throw new HttpException({
          code : code.PAGE_ALREADY_IN_USE,
          message : message.PAGE_ALREADY_IN_USE,
          description : ''
        }, HttpStatus.CONFLICT)
      }
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async findPageByIdOfUserAndIdOfPage(userId: string, pageId: string) {
    try {
      const res = await this.repository.findOne({
        where: { user_id: userId, id: pageId },
      }).catch((err) => {
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
        code : code.NOT_FOUND,
        message : 'not find page by id of user end id of page',
        description : 'id do usuario e id da pagina, não coincide como chave composta',
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async increment(id: any) {
    try {
      const page = await this.repository.findOne({ 
        where: { id: id } 
      }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (typeof page?.number_of_followers == 'number') {
        page.number_of_followers++
        await this.repository.update(page.id, {
          number_of_followers: page.number_of_followers,
        })
        return page
      }

      throw new HttpException({
        code : code.DATA_CONFLICT,
        message : 'not find increment for user',
        description : '',
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async decrement(id: any) {
    try {
      const page = await this.repository.findOne({ where: { id: id } })

      if (typeof page?.number_of_followers == 'number') {
        page.number_of_followers--
        await this.repository.update(page.id, {
          number_of_followers: page.number_of_followers,
        })
        return page
      }
      
      throw new HttpException({
        code : code.DATA_CONFLICT,
        message : 'not find decrement for user',
        description : '',
      }, HttpStatus.CONFLICT)

    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async incrementNumberFollowersPage(id: number) {
    await this.increment(id);
  }

  public async decrementNumberFollowersPage(id: number) {
    await this.decrement(id);
  }

  public async create(body: CreatePage) {
    await this.pageAlreadyExist(body.page_name);
    body.number_of_followers = 0;
    return await this.save(body);
  }

  public async updatePage(body: UpdatePage) {
    await this.findPageByIdOfUserAndIdOfPage(
      body.user_id.toString(),
      body.id.toString(),
    )
    await this.update(body.id, body)
    return await this.findOneById(body.id)
  }

  public async save(body: CreatePage) {
    return await this.repository.save(body).catch((err) => {
      throw new HttpException({
        code : code.QUERY_FAILED,
        message :  `${err.detail || err.hint || err.routine}`,
        description : ''
      }, HttpStatus.BAD_REQUEST)
    })
  }

  public async update(id: number, body: UpdatePage) {
    try {
      const res = await this.repository.update(id, { ...(body as any) }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
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

      const res = await this.repository_custom.listAll(
        search,
        limit,
        offset,
        order,
        column,
        start,
        end,
      )
      const count = await this.repository_custom.countListAll(search, start, end)

      if (Object.keys(res).length != 0) {
        return { res: res, count: count }
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found list all',
        description : ''
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }
}
