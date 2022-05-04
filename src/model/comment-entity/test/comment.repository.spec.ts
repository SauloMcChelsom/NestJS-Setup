/*import { Test, TestingModule, } from '@nestjs/testing';

import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionManager } from 'typeorm';
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit';

import { CommentService } from '@root/src/controller/comment/comment.service';
import { CommentEntity } from '@root/src/entity/comment.entity';
import { PublicationService } from '@root/src/modules/publication/publication.service';
import { CommentModel } from '@root/src/modules/comment/comment.model';
import { CommentRepository } from '@root/src/modules/comment/comment.repository';
import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/shared/utility/empty/empty.service';
import { PublicationModel } from '@root/src/modules/publication/publication.model';
import { PublicationRepository } from '@root/src/modules/publication/publication.repository';
import { GetCommentParams } from '@root/src/params.jest'

describe('CommentRepository', () => {
  let repository: CommentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...connectionDataBaseForTest(), 
        TypeOrmModule.forFeature([CommentEntity, CommentRepository])
      ],
      providers: [
        CommentService, 
        CommentModel,
        PublicationService,
        CommentRepository,
        IsValidTimestampService,
        EmptyService,
        PublicationModel,
        PublicationRepository,
      ],
    })
    .compile();
    repository = module.get<CommentRepository>(CommentRepository);
  });

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('listByUserId', () => {
    it('SUCCESSFULLY_FOUND', async () => {
      const comment = await repository.listByUserId(
        GetCommentParams.user_id,
        GetCommentParams.search, 
        GetCommentParams.limit,
        GetCommentParams.offset,
        GetCommentParams.order,
        GetCommentParams.column,
        GetCommentParams.timestampStart,
        GetCommentParams.timestampEnd
      )
      await expect(comment[0].user_id).toEqual(GetCommentParams.user_id)
    });
  });

  describe('countListByUserId', () => {
    it('SUCCESSFULLY_FOUND', async () => {
      const comment = await repository.countListByUserId(
        GetCommentParams.user_id,
        GetCommentParams.search, 
        GetCommentParams.timestampStart,
        GetCommentParams.timestampEnd
      )
      await expect(comment).isNumber()
    });
  });

  describe('listByPublicationId', () => {
    it('SUCCESSFULLY_FOUND', async () => {
      const comment = await repository.listByPublicationId(
        GetCommentParams.publication_id,
        GetCommentParams.search, 
        GetCommentParams.limit,
        GetCommentParams.offset,
        GetCommentParams.order,
        GetCommentParams.column,
        GetCommentParams.timestampStart,
        GetCommentParams.timestampEnd
      )
      await expect(comment[0].publication_id).toEqual(GetCommentParams.publication_id)
    });
  });

  describe('countListByPublicationId', () => {
    it('SUCCESSFULLY_FOUND', async () => {
      const comment = await repository.countListByPublicationId(
        GetCommentParams.user_id,
        GetCommentParams.search, 
        GetCommentParams.timestampStart,
        GetCommentParams.timestampEnd
      )
      await expect(comment).isNumber()
    });
  });
});

interface CustomMatchers<R = unknown> {
  toBeWithinRange(floor: number, ceiling: number): R;
  isNumber(floor?: number): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}*/