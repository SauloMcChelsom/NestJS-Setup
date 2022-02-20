import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';
import * as supertest from 'supertest';
import { connectionDataBaseForTest } from '@conf/options/options.conf';
import { AppModule } from '@root/src/app.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@entity/comment.entity';
import { CommentRepository } from '../../comment.repository';

describe('CommentController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ...connectionDataBaseForTest(),
        TypeOrmModule.forFeature([CommentEntity, CommentRepository]),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  it('GET /comment/public/:id', async () => {
    const { body } = await supertest
      .agent(app.getHttpServer())
      .get('/comment/public/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
      
      console.log(body)
      expect(body.results).toEqual([
        {
          id: 2,
          comment: 'Esse vídeo é tão bom, que atrai até minhas cachorras pra procurar kkkk super funciona pra gatos e cachorros',
          timestamp: 'Sun Jan 23 2022 00:34:25 GMT-0300 (GMT-03:00)',
          publication_id: 1,
          user_id: 2
        }
      ]);
  });

});
