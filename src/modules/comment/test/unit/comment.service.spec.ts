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

import { CommentModel} from '../../comment.model';
import { CommentService } from '../../comment.service';
import { CommentRepository } from '../../comment.repository';


describe('CommentService', () => {
  let service: CommentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...connectionDataBaseForTest(), 
                TypeOrmModule.forFeature([CommentEntity, CommentRepository])
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
                PublicationRepository
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

    describe('publicFindOneById', () => {
        it('SUCCESSFULLY_FOUND', async () => {
            const comment = await service.publicFindOneById(8);
            await expect(typeof comment).toEqual('object')
        });
    
        it('NOT_FOUND', async () => {
            try {
                await service.publicFindOneById(1);
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