import { CreateTopPageDto } from '../src/top-page/dto/create-top-page.dto';
import { disconnect, Types } from 'mongoose';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

const testDto: CreateTopPageDto = {
  firstCategory: 0,
  secondCategory: 'TestSecondCategory',
  alias: 'TestAlias3',
  title: 'TestTitle',
  category: 'TestCategory',
  hh: {
    count: 1,
    juniorSalary: 1,
    middleSalary: 2,
    seniorSalary: 3,
  },
  advantages: [
    {
      title: 'TestAdvantagesTitle',
      description: 'TestAdvantagesDescription',
    },
  ],
  seoText: 'TestSeoText',
  tagsTitle: 'TestTagsTitle',
  tags: 'Test',
};

const patchDto = { alias: 'TestAlias4' };

const id = new Types.ObjectId().toHexString();

describe('TopPageController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/top-page/create (POST) - success', async (done) => {
    return request(app.getHttpServer())
      .post('/top-page/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        done();
      });
  });

  it('/top-page/:id (GET) - success', async (done) => {
    return request(app.getHttpServer())
      .get('/top-page/' + createdId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.alias).toEqual(testDto.alias);
        done();
      });
  });

  it('/top-page/:id (PATCH) - success', async (done) => {
    return request(app.getHttpServer())
      .patch('/top-page/' + createdId)
      .send(JSON.stringify(patchDto))
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.alias).toEqual(patchDto.alias);
        done();
      });
  });

  it('/top-page/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete('/top-page/' + createdId)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
