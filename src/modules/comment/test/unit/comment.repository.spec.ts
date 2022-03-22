import { Test, TestingModule, } from '@nestjs/testing';

import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionManager } from 'typeorm';
import { connectionDataBaseForTest } from '@conf/options/options.conf';

import { CommentService } from '@root/src/modules/comment/comment.service';
import { CommentEntity } from '@root/src/entity/comment.entity';
import { PublicationService } from '@root/src/modules/publication/publication.service';
import { CommentModel } from '@root/src/modules/comment/comment.model';
import { CommentRepository } from '@root/src/modules/comment/comment.repository';
import { IsValidTimestampService } from '@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/lib/utility/empty/empty.service';
import { PublicationModel } from '@root/src/modules/publication/publication.model';
import { PublicationRepository } from '@root/src/modules/publication/publication.repository';

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
        PublicationRepository
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
      const comment = await repository.listByUserId(8);
      await expect(typeof comment).toEqual('object')
    });

    it('NOT_FOUND', async () => {
      const comment = await repository.listByUserId(0);
      expect(comment).toHaveLength(0)
    });
  });

});