
import { HttpException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';

import { CommentEntity } from '@entity/comment.entity';
import { connectionDataBaseForTest } from '@conf/options/options.conf';

//import { PhotoService as CommentModel} from '../../photo.service';

import { CommentModel} from '../../comment.model';



import { IsValidTimestampService } from '@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/lib/utility/empty/empty.service';
import { CommentRepository } from '../../comment.repository';

describe('CommentModel', () => {
  let service: CommentModel;

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
    service = module.get<CommentModel>(CommentModel);
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
      const spaceships = await service.findOneById(2);
      await expect(typeof spaceships).toEqual('object')
    });
  
    it('NOT_FOUND', async () => {
      try {
        await service.findOneById(1);
      } catch (e: any) {
        await expect(e).toEqual(new HttpException('NOT_FOUND', 404))
      }
    });
  })

});