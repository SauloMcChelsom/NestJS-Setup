import { Test, TestingModule, } from '@nestjs/testing'

import { TypeOrmModule } from '@nestjs/typeorm'
import { getConnectionManager } from 'typeorm'
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit'

import { PageEntity } from '@root/src/entity/page.entity'

import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service'
import { EmptyService } from '@root/src/shared/utility/empty/empty.service'
import { PageEntityModule } from '@model/page-entity/page-entity.module'

import { PageEntityModel } from '../page-entity.model'
import { PageEntityRepository } from '../page-entity.repository'
import { PageSearch } from '@root/src/params.jest'

describe('PageRepository', () => {
  let repository: PageEntityRepository
  let model: PageEntityModel


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...connectionDataBaseForTest(), 
        TypeOrmModule.forFeature([PageEntity, PageEntityRepository]),
        PageEntityModule
      ],
      providers: [
        PageEntityModel,
        PageEntityRepository,
        IsValidTimestampService,
        EmptyService,
      ],
    })
    .compile()
    repository = module.get<PageEntityRepository>(PageEntityRepository)
    model = module.get<PageEntityModel>(PageEntityModel)    
  })

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('listAll', () => {
    it('', async () => {
      const page = await repository.listAll(
         PageSearch.search, 
         PageSearch.limit,
         PageSearch.offset,
         PageSearch.order,
         PageSearch.column,
        //PageSearch.user_id,
        //PageSearch.timestampStart, 
        //PageSearch.timestampEnd, 
      )
      await expect(page[0].user_id).toEqual(PageSearch.user_id)
    })
    
    it('countListAll', async () => {
      const page = await repository.countListAll(
        PageSearch.search,
       // PageSearch.timestampStart, 
       // PageSearch.timestampEnd, 
      )
      await expect(page).isNumber()
    })
  
   
  })
})

interface CustomMatchers<R = unknown> {
  toBeWithinRange(floor: number, ceiling: number): R
  isNumber(floor?: number): R
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}