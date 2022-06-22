/*import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';
import * as supertest from 'supertest';
import { AppModule } from '@root/src/app.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@entity/comment.entity';
import { CommentRepository } from '../../comment.repository';

import { InitializeFirebase } from '@root/src/conf/firebase/initialize-firebase';

import { VersioningType } from '@nestjs/common'

import { 
  CreateCommentParams,
  GetCommentParams, 
  UpdateCommentParams, 
  jwtToken,
  jwtTokenExpirationTime 
} from '@root/src/params.jest'

describe('CommentController (e2e)', () => {
  let PUBLIC_COMMENT_ID:number;
  let PRIVATE_COMMENT_ID:number;
  let app: INestApplication;
  new InitializeFirebase();

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
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: ['1/private', '1/public'],
    })
    await app.init();
  });

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    getConnectionManager().get().close()
    done()
  })

  describe('postar um comentario por uri privado', () => {
    it('POST /v1/private/comment', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/v1/private/comment/`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(CreateCommentParams)
        .expect(201);
        PRIVATE_COMMENT_ID = body.results[0].id
        expect(body.results[0].id).toEqual(expect.any(Number));
    }); 
  }); 
   
  describe('postar um comentario por uri publico', () => {
    it('POST /v1/public/comment/user/:id', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post(`/v1/public/comment/user/${CreateCommentParams.user_id}`)
        .set('Content-Type', 'application/json')
        .send(CreateCommentParams)
        .expect(201);
        PUBLIC_COMMENT_ID = body.results[0].id
        expect(body.results[0].id).toEqual(expect.any(Number));
    });
  }); 

  describe('buscar uma lista de comentario pelo token do usuario por uri private', () => {
    it('GET /v1/private/comment/user', async () => {
      const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/v1/private/comment/user/`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .query({offset:0})
      .query({order:'ASC'})
      .query({column:'timestamp'})
      .query({search:''})
      .query({start:'2021-03-15'})
      .query({end:'2022-03-31'})
      .query({limit:3})
      .expect(200);
      expect(body.statusCode).toEqual(200);
      expect(body.code).toEqual('SUCCESSFULLY_FOUND');
      expect(body.results).toHaveLength(3);
      expect(body.count).toEqual(expect.any(Number));
    });
  }); 

  describe('buscar uma lista de comentario informando o id do usuario por uri private', () => {
    it('GET /v1/private/comment/user/:id', async () => {
      const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/v1/private/comment/user/${GetCommentParams.user_id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .query({offset:0})
      .query({order:'ASC'})
      .query({column:'timestamp'})
      .query({search:''})
      .query({start:'2021-03-15'})
      .query({end:'2022-03-31'})
      .query({limit:3})
      .expect(200);
      expect(body.statusCode).toEqual(200);
      expect(body.code).toEqual('SUCCESSFULLY_FOUND');
      expect(body.results).toHaveLength(3);
      expect(body.count).toEqual(expect.any(Number));
      expect(body.results[0].user_id).toEqual(GetCommentParams.user_id);
    });
  });

  describe('buscar uma lista de comentario informando o id do usuario por uri publico', () => {
    it('GET /v1/public/comment/user/:id', async () => {
      const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/v1/public/comment/user/${GetCommentParams.user_id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .query({offset:0})
      .query({order:'ASC'})
      .query({column:'timestamp'})
      .query({search:''})
      .query({start:'2021-03-15'})
      .query({end:'2022-03-31'})
      .query({limit:3})
      .expect(200);
      expect(body.statusCode).toEqual(200);
      expect(body.code).toEqual('SUCCESSFULLY_FOUND');
      expect(body.results).toHaveLength(3);
      expect(body.count).toEqual(expect.any(Number));
      expect(body.results[0].user_id).toEqual(GetCommentParams.user_id);
    });
  }); 

  describe('buscar uma lista de comentario informando o id da publicação por uri publico', () => {
    it('GET /v1/public/comment/publication/:id', async () => {
      const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/v1/public/comment/publication/${GetCommentParams.publication_id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .query({offset:0})
      .query({order:'ASC'})
      .query({column:'timestamp'})
      .query({search:''})
      .query({start:'2021-03-15'})
      .query({end:'2022-03-31'})
      .query({limit:3})
      .expect(200);
      expect(body.statusCode).toEqual(200);
      expect(body.code).toEqual('SUCCESSFULLY_FOUND');
      expect(body.results).toHaveLength(3);
      expect(body.count).toEqual(expect.any(Number));
      expect(body.results[0].publication_id).toEqual(GetCommentParams.publication_id);
    });
  });

  describe('buscar um comentario informando o id por uri private', () => {
    it('GET /v1/private/comment/:comment_id', async () => {
      const comment_id = GetCommentParams.id
      const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/v1/private/comment/${comment_id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
      expect(body.statusCode).toEqual(200);
      expect(body.code).toEqual('SUCCESSFULLY_FOUND');
      expect(body.results).toHaveLength(1);
      expect(body.count).toEqual(expect.any(Number));
      expect(body.statusCode).toEqual(200);
    });
  });

  describe('buscar um comentario informando o id por uri publico', () => {
    it('GET /v1/public/comment/:comment_id', async () => {
      const comment_id = GetCommentParams.id
      const { body } = await supertest
      .agent(app.getHttpServer())
      .get(`/v1/public/comment/${comment_id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
      expect(body.statusCode).toEqual(200);
      expect(body.code).toEqual('SUCCESSFULLY_FOUND');
      expect(body.results).toHaveLength(1);
      expect(body.count).toEqual(expect.any(Number));
      expect(body.statusCode).toEqual(200);
    });
  });

  describe('atualizar um comentario informando o id por uri private', () => {
    it('PUT /v1/private/comment/:comment_id', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .put(`/v1/private/comment/${GetCommentParams.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(UpdateCommentParams)
        .expect(200);
        expect(body.statusCode).toEqual(200);
        expect(body.code).toEqual('SUCCESSFULLY_UPDATED');
    });
  });

  describe('atualizar um comentario informando o id do comentario e o id do usuario por uri public', () => {
    it('PUT /v1/public/comment/:comment_id/user/:user_id/', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .put(`/v1/public/comment/${GetCommentParams.id}/user/${GetCommentParams.user_id}/`)
        .set('Content-Type', 'application/json')
        .send(UpdateCommentParams)
        expect(body.statusCode).toEqual(200);
        expect(body.code).toEqual('SUCCESSFULLY_UPDATED');
    });
  });

  describe('deletar um comentario informando o id por uri private', () => {
    it('DELETE /v1/private/comment/:comment_id', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .delete(`/v1/private/comment/${PRIVATE_COMMENT_ID}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);
        expect(body.statusCode).toEqual(200);
        expect(body.code).toEqual('DELETED_SUCCESSFULLY');
    });
  });

  describe('deletar um comentario informando o id do comentario e o id do usuario por uri public', () => {
    it('DELETE /v1/public/comment/:comment_id/user/:user_id/', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .delete(`/v1/public/comment/${PUBLIC_COMMENT_ID}/user/${GetCommentParams.user_id}/`)
        .set('Content-Type', 'application/json')
        .expect(200);
        expect(body.statusCode).toEqual(200);
        expect(body.code).toEqual('DELETED_SUCCESSFULLY');
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