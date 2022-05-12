import { Test, TestingModule, } from '@nestjs/testing'

import { TypeOrmModule } from '@nestjs/typeorm'
import { getConnectionManager } from 'typeorm'
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit'

import { FollowEntity } from '@root/src/entity/follow.entity'

import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service'
import { EmptyService } from '@root/src/shared/utility/empty/empty.service'
import { PageEntityModule } from '@model/page-entity/page-entity.module'

import { FollowEntityModel } from '../follow-entity.model'
import { FollowEntityRepository } from '../follow-entity.repository'
import { FollowSearch, FollowBy } from '@root/src/params.jest'

describe('FollowRepository', () => {
  let repository: FollowEntityRepository
  let model: FollowEntityModel


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...connectionDataBaseForTest(), 
        TypeOrmModule.forFeature([FollowEntity, FollowEntityRepository]),
        PageEntityModule
      ],
      providers: [
        FollowEntityModel,
        FollowEntityRepository,
        IsValidTimestampService,
        EmptyService,
      ],
    })
    .compile()
    repository = module.get<FollowEntityRepository>(FollowEntityRepository)
    model = module.get<FollowEntityModel>(FollowEntityModel)    
  })

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('listAllPageUserFollowByIdOfUser', () => {
    it('', async () => {
      await model.save(FollowBy)
      const follow = await repository.listAllPageUserFollowByIdOfUser(
        FollowSearch.user_id,
        FollowSearch.limit,
        FollowSearch.offset,
        FollowSearch.order,
        FollowSearch.column,
       // FollowSearch.search, 
        //FollowSearch.timestampStart, 
        //FollowSearch.timestampEnd, 
      )
      await expect(follow[0].user_id).toEqual(FollowSearch.user_id)
    })
    
    it('countListByUserId', async () => {
      const follow = await repository.countListAllPageUserFollowByIdOfUser(
        FollowSearch.user_id,
       // FollowSearch.timestampStart, 
       // FollowSearch.timestampEnd, 
      )
      await expect(follow).isNumber()
    })
  
    it('listAllUserFollowPageByIdOfPage', async () => {
      const follow = await repository.listAllUserFollowPageByIdOfPage(
        FollowSearch.page_id,
        FollowSearch.limit,
        FollowSearch.offset,
        FollowSearch.order,
        FollowSearch.column,
       // FollowSearch.search, 
        //FollowSearch.timestampStart, 
        //FollowSearch.timestampEnd, 
      )
      await expect(follow[0].page_id).toEqual(FollowSearch.page_id)
    })

    it('countListAllUserFollowPageByIdOfPage', async () => {
      const follow = await repository.countListAllUserFollowPageByIdOfPage(
        FollowSearch.user_id,
       // FollowSearch.timestampStart, 
        //FollowSearch.timestampEnd, 
      )
      await expect(follow).isNumber()
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