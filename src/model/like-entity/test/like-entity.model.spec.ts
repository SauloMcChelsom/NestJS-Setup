import { HttpException, HttpStatus } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionManager } from 'typeorm'

import { LikeEntity } from '@entity/like.entity'
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit'
import { PublicationEntityModule } from '@model/publication-entity/publication-entity.module'

import { LikeEntityModel} from '../like-entity.model'
import { LikeEntityRepository } from '../like-entity.repository'
import { LikeBy } from '@root/src/params.jest'

describe('likeModel', () => {
  let model: LikeEntityModel
  let CREATE

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...connectionDataBaseForTest(), 
        TypeOrmModule.forFeature([LikeEntity, LikeEntityRepository]),
        PublicationEntityModule
      ],
      providers: [
        LikeEntityModel,
        LikeEntityRepository
      ],
    }).compile()
    model = module.get<LikeEntityModel>(LikeEntityModel)    
  })

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('', () => {
    it('userAlreadyLikePublication', async () => {
      const res = await model.userAlreadyLikePublication(LikeBy.publication_id.toString(), LikeBy.user_id.toString())
      await expect(res).isTrue()
    })

    it('validatePublicationExists', async () => {
      const res = await model.validatePublicationExists(LikeBy.publication_id)
      await expect(res).isTrue()
    })

    it('getLike', async () => {
      const res = await model.getLike(LikeBy.publication_id.toString(), LikeBy.user_id.toString())
      await expect(res.publication_id).toBe(LikeBy.publication_id)
      await expect(res.user_id).toBe(LikeBy.user_id)
    })

    it('create', async () => {
      const res = await model.create(LikeBy)
      await expect(res.publication_id).toBe(LikeBy.publication_id)
      await expect(res.user_id).toBe(LikeBy.user_id)
    })

    it('save', async () => {
      LikeBy.i_liked = true
      await model.save(LikeBy)
      await expect(true).toBe(true)
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