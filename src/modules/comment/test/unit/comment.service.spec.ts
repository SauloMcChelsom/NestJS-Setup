import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';

import { connectionDataBaseForTest } from '@conf/options/options.conf';
import { PublicationService } from '@modules/publication/publication.service';
import { PublicationModel } from '@modules/publication/publication.model';
import { PublicationRepository } from '@root/src/modules/publication/publication.repository';
import { CommentEntity } from '@entity/comment.entity';
import { IsValidTimestampService } from '@root/src/lib/utility/is-valid-timestamp/is-valid-timestamp.service';
import { EmptyService } from '@root/src/lib/utility/empty/empty.service';
import { ClassificationInterface } from '@root/src/lib/interfaces';
import { GetCommentParams, CreateCommentParams } from '@root/src/params.jest'

import { PublicationEntity } from '@root/src/entity/publication.entity';

import { CommentModel} from '../../comment.model';
import { CommentService } from '../../comment.service';
import { CommentRepository } from '../../comment.repository';


describe('CommentService', () => {
  let service: CommentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...connectionDataBaseForTest(), 
                TypeOrmModule.forFeature([CommentEntity, CommentRepository, PublicationEntity, PublicationRepository])
            ],
            providers: [
                CommentRepository,
                CommentEntity,
                CommentService,
                PublicationService,
                CommentModel,
                CommentService, 
                CommentModel,
                PublicationService,
                CommentRepository,
                IsValidTimestampService,
                EmptyService,
                PublicationModel,
                PublicationRepository,
                PublicationEntity
            ],
        }).compile();
        service = module.get<CommentService>(CommentService);
    });

    beforeAll(done => {
        done()
    })
    
    afterAll(done => {
        getConnectionManager().get().close()
        done()
    })

    describe('authListByUserId', () => {
        it('SUCCESSFULLY_FOUND', async () => {

           let cls: ClassificationInterface = {
            search: GetCommentParams.search,
            limit: GetCommentParams.limit,
            offset: GetCommentParams.offset,
            order: GetCommentParams.order,
            column: GetCommentParams.column,
            end: GetCommentParams.timestampStart,
            start: GetCommentParams.timestampEnd
           }
            //const comment = await service.authListByUserId(GetCommentParams.user_id, cls);
            //await expect(typeof comment).toEqual('object')
        });
    })

    describe('publicListByUserId', () => {
        it('SUCCESSFULLY_FOUND', async () => {
            let cls: ClassificationInterface = {
                search: GetCommentParams.search,
                limit: GetCommentParams.limit,
                offset: GetCommentParams.offset,
                order: GetCommentParams.order,
                column: GetCommentParams.column,
                end: GetCommentParams.timestampStart,
                start: GetCommentParams.timestampEnd
               }
                //const comment = await service.publicListByUserId(GetCommentParams.user_id, cls);
                //await expect(typeof comment).toEqual('object')
        });
    })

    describe('publicListByPublicationId', () => {
        it('SUCCESSFULLY_FOUND', async () => {
            let cls: ClassificationInterface = {
                search: GetCommentParams.search,
                limit: GetCommentParams.limit,
                offset: GetCommentParams.offset,
                order: GetCommentParams.order,
                column: GetCommentParams.column,
                end: GetCommentParams.timestampStart,
                start: GetCommentParams.timestampEnd
               }
                //const comment = await service.publicListByPublicationId(GetCommentParams.user_id, cls);
                //await expect(typeof comment).toEqual('object')
        });
    })

    describe('authFindOneById', () => {
        it('SUCCESSFULLY_FOUND', async () => {
            const comment = await service.authFindOneById(
                GetCommentParams.id,
                GetCommentParams.user_id
            );
            await expect(typeof comment).toEqual('object')
        });
    });

    describe('publicFindOneById', () => {
        it('SUCCESSFULLY_FOUND', async () => {
            const comment = await service.publicFindOneById(
                GetCommentParams.id
            );
            await expect(typeof comment).toEqual('object')
        });
    });

    describe('create', () => {
        it('SUCCESSFULLY_CREATE', async () => {
            const comment = await service.create(
                CreateCommentParams
            )
            console.log(comment)
            await expect(comment).toHaveProperty('id')
        });
    });

});