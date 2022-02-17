import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@root/src/app.module';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  
  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = mockAppModule.createNestApplication();

    await app.init();
  });

  it('/public/email/:email', async () => {
    const response = await request(app.getHttpServer())
      .get('/v1/user/public/email/2033.xyz@gmail.com')
      .expect(200)
      .expect('Hello World!');
  });

});
