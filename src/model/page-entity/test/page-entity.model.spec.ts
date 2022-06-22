import { HttpException, HttpStatus } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionManager } from 'typeorm'

import { PageEntity } from '@entity/page.entity'
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit'
import { PublicationEntityModule } from '@model/publication-entity/publication-entity.module'
import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/shared/utility/empty/empty.service';

import { PageEntityModel} from '../page-entity.model'
import { PageEntityRepository } from '../page-entity.repository'
import { PageBy } from '@root/src/params.jest'
import { UpdatePage } from '@root/src/shared/interfaces/page.interface'

describe('pageModel', () => {
  let model: PageEntityModel
  let CREATE
  let up:UpdatePage
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...connectionDataBaseForTest(), 
        TypeOrmModule.forFeature([PageEntity, PageEntityRepository]),
        PublicationEntityModule
      ],
      providers: [
        PageEntityModel,
        PageEntityRepository,
        IsValidTimestampService,
        EmptyService
      ],
    }).compile()
    model = module.get<PageEntityModel>(PageEntityModel)    
  })

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('', () => {
    it('findOneByName', async () => {
      const res = await model.findOneByName(PageBy.page_name)
      await expect(res.number_of_followers).isNumber()
      await expect(res.page_description).isStrings()
      await expect(res.page_name).isStrings()
      await expect(res.user_id).isNumber()
    })

    it('findOneById', async () => {
      const res = await model.findOneById(PageBy.id)
      await expect(res.number_of_followers).isNumber()
      await expect(res.page_description).isStrings()
      await expect(res.page_name).isStrings()
      await expect(res.user_id).isNumber()
    })

    it('pageAlreadyExist', async () => {
      try {
        const res = await model.pageAlreadyExist(PageBy.page_name)
      } catch (e: any) {
        await expect(e.response.code).toEqual('PAGE_ALREADY_IN_USE')
      }
    })

    it('findPageByIdOfUserAndIdOfPage', async () => {
      const res = await model.findPageByIdOfUserAndIdOfPage(PageBy.user_id.toString(), PageBy.id.toString())
      await expect(res.number_of_followers).isNumber()
      await expect(res.page_description).isStrings()
      await expect(res.page_name).isStrings()
      await expect(res.user_id).isNumber()
    })

    it('increment', async () => {
      const res = await model.increment(PageBy.id)
      await expect(res.number_of_followers).isNumber()
      await expect(res.page_description).isStrings()
      await expect(res.page_name).isStrings()
      await expect(res.user_id).isNumber()
    })

    it('decrement', async () => {
      const res = await model.decrement(PageBy.id)
      await expect(res.number_of_followers).isNumber()
      await expect(res.page_description).isStrings()
      await expect(res.page_name).isStrings()
      await expect(res.user_id).isNumber()
    })

    it('create', async () => {
      PageBy.page_name = 'test ABC:' + new Date().toString()
      PageBy.id = null
      PageBy.timestamp = null
      const res = await model.create(PageBy)
      CREATE = res
      await expect(res.number_of_followers).isNumber()
      await expect(res.page_description).isStrings()
      await expect(res.page_name).isStrings()
      await expect(res.user_id).isNumber()
    })

    it('updatePage', async () => {
      up = {
        id:CREATE.id,
        page_description:CREATE.page_description,
        page_name:CREATE.page_name,
        user_id:CREATE.user_id
      } 
      const res = await model.updatePage(up)
      await expect(res.number_of_followers).isNumber()
      await expect(res.page_description).isStrings()
      await expect(res.page_name).isStrings()
      await expect(res.user_id).isNumber()
    })
  })
})

interface CustomMatchers<R = unknown> {
  toBeWithinRange(floor: number, ceiling: number): R
  isNumber(floor?: number): R
  isStrings(floor?: string): R
  isDataTime(floor?: Date): R
  isTrue(floor?: Date): R
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}