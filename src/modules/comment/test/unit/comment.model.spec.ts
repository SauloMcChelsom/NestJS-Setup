import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';

import { CommentEntity } from '@entity/comment.entity';
import { connectionDataBaseForTest } from '@conf/options/options.conf';
import { IsValidTimestampService } from '@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/lib/utility/empty/empty.service';

import { CommentModel} from '../../comment.model';
import { CommentRepository } from '../../comment.repository';
import { CommentParams } from '@root/src/params.jest'

describe('CommentModel', () => {
  let model: CommentModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...connectionDataBaseForTest(), 
        TypeOrmModule.forFeature([CommentEntity, CommentRepository])
      ],
      providers: [
        CommentModel,
        IsValidTimestampService,
        EmptyService,
        CommentRepository,
        CommentEntity
      ],
    }).compile();
    model = module.get<CommentModel>(CommentModel);
  });

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('findOneById', () => {

    it('SUCCESSFULLY_FOUND', async () => {
      const comment = await model.findOneById(CommentParams.id);
      await expect(comment.user_id).toEqual(CommentParams.user_id)
    });
  
    it('NOT_FOUND', async () => {
      try {
        await model.findOneById(0);
      } catch (e: any) {
        await expect(e).toEqual(
          new HttpException({
            code: 'NOT_FOUND',
            message: 'not found find one by id',
            description: ''
          }, HttpStatus.NOT_FOUND)
        )
      }
    });
  })

});