import { Test, TestingModule, } from '@nestjs/testing'

import { TypeOrmModule } from '@nestjs/typeorm'
import { getConnectionManager } from 'typeorm'
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit'

import { CommentEntity } from '@root/src/entity/comment.entity'

import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service'
import { EmptyService } from '@root/src/shared/utility/empty/empty.service'

import { CommentEntityModel} from '../comment-entity.model'
import { CommentEntityRepository } from '../comment-entity.repository'
import { CommentBy } from '@root/src/params.jest'

describe('CommentRepository', () => {
  let repository: CommentEntityRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...connectionDataBaseForTest(), 
        TypeOrmModule.forFeature([CommentEntity, CommentEntityRepository])
      ],
      providers: [
        CommentEntityModel,
        CommentEntityRepository,
        IsValidTimestampService,
        EmptyService,
      ],
    })
    .compile()
    repository = module.get<CommentEntityRepository>(CommentEntityRepository)
  })

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('listByUserId', () => {
    it('', async () => {
      const comment = await repository.listByUserId(
        CommentBy.user_id,
        CommentBy.search, 
        CommentBy.limit,
        CommentBy.offset,
        CommentBy.order,
        CommentBy.column
      )
      await expect(comment[0].user_id).toEqual(CommentBy.user_id)
    })

    it('countListByUserId', async () => {
      const comment = await repository.countListByUserId(
        CommentBy.user_id,
        CommentBy.search, 
        CommentBy.timestampStart,
        CommentBy.timestampEnd
      )
      await expect(comment).isNumber()
    })
  
    it('listByPublicationId', async () => {
      const comment = await repository.listByPublicationId(
        CommentBy.publication_id,
        CommentBy.search, 
        CommentBy.limit,
        CommentBy.offset,
        CommentBy.order,
        CommentBy.column,
      )
      await expect(comment[0].publication_id).toEqual(CommentBy.publication_id)
    })

    it('countListByPublicationId', async () => {
      const comment = await repository.countListByPublicationId(
        CommentBy.user_id,
        CommentBy.search, 
        CommentBy.timestampStart,
        CommentBy.timestampEnd
      )
      await expect(comment).isNumber()
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