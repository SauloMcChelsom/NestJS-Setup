/*import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';

import { CommentEntity } from '@entity/comment.entity';
import { connectionDataBaseForTest } from '@root/connection-database-for-test-unit';
import { IsValidTimestampService } from '@root/src/shared/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/shared/utility/empty/empty.service';
import { code } from '@root/src/shared/enum';

import { CommentService } from '@root/src/controller/comment/comment.service';
import { PublicationService } from '@root/src/modules/publication/publication.service';
import { PublicationModel } from '@root/src/modules/publication/publication.model';
import { PublicationRepository } from '@root/src/modules/publication/publication.repository';

import { CommentModel} from '../../comment.model';
import { CommentRepository } from '../../comment.repository';
import { GetCommentParams, CreateCommentParams, UpdateCommentParams } from '@root/src/params.jest'

describe('CommentModel', () => {
  let model: CommentModel;
  let CREATE

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
  
  describe('create', () => {
    it('SUCCESSFULLY_CREATE', async () => {
      const comment = await model.create(CreateCommentParams);
      CREATE = comment
      await expect(comment.id).isNumber()
    });
  })

  describe('update', () => {
    it('SUCCESSFULLY_UPDATE', async () => {
      const comment = await model.updateById(UpdateCommentParams.id, UpdateCommentParams);
      await expect(comment.code).toEqual(code.SUCCESSFULLY_UPDATED)
    });
    it('FAILED_UPDATE', async () => {
      try{
        await model.updateById(0, UpdateCommentParams);
      }catch(e){
        await expect(e).toEqual(
          new HttpException({
            code : code.NOT_FOUND,
            message : 'update, id not found',
            description : ''
          }, HttpStatus.NOT_FOUND)
        )
      }
    });
    it('POSTGRES_FAILED_UPDATE', async () => {
      try{
        await model.updateById(UpdateCommentParams.id, {
          id:0,
          comment: '',
          user_id:0,
        });
      }catch(e:any){
        await expect(e.response.code).toEqual(code.QUERY_FAILED)
      }
    });
  })

  describe('validateID', () => {
    it('SUCCESSFULLY_FOUND', async () => {
      const comment = await model.validateID(GetCommentParams.id, GetCommentParams.user_id);
      await expect(comment).toEqual(true)
    });
    it('NOT_FOUND', async () => {
      try {
        await model.validateID(GetCommentParams.id, GetCommentParams.user_id)
      } catch (e: any) {
        await expect(e).toEqual(
          new HttpException({
            code: 'NOT_FOUND',
            message: 'validate, id not found',
            description: ''
          }, HttpStatus.NOT_FOUND)
        )
      }
    });
  })

  describe('findOneById', () => {
    it('SUCCESSFULLY_FOUND', async () => {
      const comment = await model.findOneById(GetCommentParams.id);
      await expect(comment.user_id).toEqual(GetCommentParams.user_id)
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

  describe('deleteById', () => {
    it('SUCCESSFULLY_DELETE', async () => {
      const comment = await model.deleteById(CREATE.id);
      await expect(comment.code).toEqual(code.SUCCESSFULLY_DELETED)
    });
    it('FAILED_DELETE', async () => {
      try{
        await model.deleteById(0);
      }catch(e){
        await expect(e).toEqual(
          new HttpException({
            code : code.NOT_FOUND,
            message : 'delete, id not found',
            description : ''
          }, HttpStatus.NOT_FOUND)
        )
      }
    });
  })
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