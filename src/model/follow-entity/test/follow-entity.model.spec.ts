import { HttpException, HttpStatus } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionManager } from 'typeorm'

import { FollowEntity } from '@entity/follow.entity'
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit'
import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service'
import { EmptyService } from '@root/src/shared/utility/empty/empty.service'
import { PageEntityModule } from '@model/page-entity/page-entity.module'

import { FollowEntityModel} from '../follow-entity.model'
import { FollowEntityRepository } from '../follow-entity.repository'
import { FollowBy } from '@root/src/params.jest'

describe('followModel', () => {
  let model: FollowEntityModel
  let CREATE

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
    }).compile()
    model = module.get<FollowEntityModel>(FollowEntityModel)    
  })

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('', () => {
    it('userAlreadyFollowPage', async () => {
      const res = await model.userAlreadyFollowPage(FollowBy.user_id.toString(), FollowBy.page_id.toString())
      await expect(res).toBe(true)
    })
    
    it('getPageUserFollow', async () => {
      const res = await model.getPageUserFollow(FollowBy.user_id.toString(), FollowBy.page_id.toString())
      await expect(res.user_id).isNumber()
      await expect(res.timestamp).isDataTime()
      await expect(res.page_id).isNumber()
    })

    it('findByIdPage', async () => {
      const res = await model.findByIdPage(FollowBy.page_id.toString())
      await expect(res[0].user_id).isNumber()
      await expect(res[0].timestamp).isDataTime()
      await expect(res[0].page_id).isNumber()
    })

    it('findByIdUser', async () => {
      await model.save(FollowBy)
      const res = await model.findByIdUser(FollowBy.user_id.toString())
      await expect(res[0].user_id).isNumber()
      await expect(res[0].timestamp).isDataTime()
      await expect(res[0].page_id).isNumber()
    })

    it('create', async () => {
      await model.save(FollowBy)
      const res = await model.create(FollowBy)
      await expect(res.user_id).isNumber()
      await expect(res.timestamp).isDataTime()
      await expect(res.page_id).isNumber()
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