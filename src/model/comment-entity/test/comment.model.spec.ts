import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';

import { CommentEntity } from '@entity/comment.entity';
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit';
import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/shared/utility/empty/empty.service';


import { CommentEntityModel} from '../comment-entity.model';
import { CommentEntityRepository } from '../comment-entity.repository';
import { CommentBy, CommentCreate } from '@root/src/params.jest'

describe('commentModel', () => {
  let model: CommentEntityModel;
  let CREATE

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
        EmptyService
      ],
    }).compile();
    model = module.get<CommentEntityModel>(CommentEntityModel);    
  });

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('', () => {
    it('findOneById', async () => {
      const res = await model.findOneById(CommentBy.id);
      await expect(res.id).isNumber()
      await expect(res.publication_id).isNumber()
      await expect(res.user_id).isNumber()
      await expect(res.timestamp).isDataTime()
      await expect(res.comment).isStrings()
    });

    it('idEqualsUserId', async () => {
      const res = await model.idEqualsUserId(CommentBy.id, CommentBy.user_id);
      await expect(res).isTrue()
    });

    it('create', async () => {
      const res = await model.create(CommentCreate);
      CREATE = res
      await expect(res.id).isNumber()
      await expect(res.publication_id).isNumber()
      await expect(res.user_id).isNumber()
      await expect(res.timestamp).isDataTime()
      await expect(res.comment).isStrings()
    });

    it('updateById', async () => {
      const res = await model.updateById(CREATE.id, CREATE);
      await expect(res.code).toBe('SUCCESSFULLY_UPDATED')
    });

    it('deleteById', async () => {
      const res = await model.deleteById(CREATE.id);
      await expect(res.code).toBe('SUCCESSFULLY_DELETED')
    });

  })
});

interface CustomMatchers<R = unknown> {
  toBeWithinRange(floor: number, ceiling: number): R;
  isNumber(floor?: number): R;
  isStrings(floor?: string): R;
  isDataTime(floor?: Date): R;
  isTrue(floor?: Date): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}