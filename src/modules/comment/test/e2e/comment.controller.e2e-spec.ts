import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';
import * as supertest from 'supertest';
import { AppModule } from '@root/src/app.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@entity/comment.entity';
import { CommentRepository } from '../../comment.repository';

import { CreateCommentParams, jwtToken } from '@root/src/params.jest'

describe('CommentController (e2e)', () => {
  let app: INestApplication;
  const  TYPEORM_TYPE = 

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          name: 'default',
          type: 'postgres',
          host: process.env.TYPEORM_HOST,
          port: Number(process.env.TYPEORM_PORT),
          username: process.env.TYPEORM_USERNAME,
          password: process.env.TYPEORM_PASSWORD,
          database:  process.env.TYPEORM_DATABASE,
          entities: ['./src/entity/*.entity.ts'],
          keepConnectionAlive:true
        }),
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

  describe('Authentication', () => {
    it('GET /v1/public/comment/publication/:id', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .get('/comment/publication/1')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect(200);
        expect(body.statusCode).toEqual(200);
    });
  
    /*it('POST /v1/public/comment/user/:id', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/comment/user/${CreateCommentParams.user_id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(CreateCommentParams)
        .expect(201);
        expect(body.statusCode).toEqual(201);
    });*/
  })
  
});
