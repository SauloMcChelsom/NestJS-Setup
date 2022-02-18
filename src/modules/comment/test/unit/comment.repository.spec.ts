import { HttpException } from '@nestjs/common';
import { Test, TestingModule, } from '@nestjs/testing';
import { getRepositoryToken, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


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

/** 
import { FirebaseService } from '@modules/firebase/firebase.service';
import { CryptUtilityService } from '@root/src/lib/bcrypt/bcrypt.service';
import { UserModel } from '@root/src/modules/user/user.model';
import { FirebaseModel } from '@root/src/modules/firebase/firebase.model';
import { UserRepository } from '@root/src/modules/user/user.repository';
*/

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

  describe('saulo', () => {
    it('SUCCESSFULLY_FOUND', async () => {
      const comment = await repository.saulo(2);
      expect(typeof comment).toEqual('object')
      // expect(comment.id).toEqual(2)
    });
  });
});