import { Test, TestingModule } from '@nestjs/testing';
import { disconnect, Types } from 'mongoose';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateProductDto } from '../src/product/dto/create-product.dto';
import { AppModule } from '../src/app.module';
import { PRODUCT_NOT_FOUND } from '../src/product/product.constants';

const testDto: CreateProductDto = {
  image: 'TestImage',
  title: 'TestTitle',
  price: 100,
  oldPrice: 200,
  credit: 10000,
  calculatedRating: 20,
  description: 'TestDescription',
  advantages: 'TestAdvantages',
  disAdvantages: 'TestDisAdvantages',
  categories: ['TestCategories'],
  tags: 'TestTags',
  characteristics: [
    {
      name: 'TestName',
      value: 'TestValue',
    },
  ],
};

const patchDto = { price: 200 };

describe('ProductControllers', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/product/create (POST) - success', async (done) => {
    return request(app.getHttpServer())
      .post('/product/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        done();
      });
  });

  it('/product/:id (GET) - success', async (done) => {
    return request(app.getHttpServer())
      .get('/product/' + createdId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.price).toBe(100);
        done();
      });
  });

  it('/product/:id (GET) - fail', async (done) => {
    return request(app.getHttpServer())
      .get('/product/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toEqual({});
        done();
      });
  });

  // it('/product/:id (PATCH) - success', async (done) => {
  //   return request(app.getHttpServer())
  //     .patch('/product/' + createdId)
  //     .send(JSON.stringify(patchDto))
  //     .expect(200)
  //     .then(({ body }: request.Response) => {
  //       expect(body.price).toEqual(patchDto.price);
  //       done();
  //     });
  // });

  it('/product/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/product/' + createdId)
      .expect(200);
  });

  it('/product/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/product/' + new Types.ObjectId().toHexString())
      .expect(404, {
        statusCode: 404,
        message: PRODUCT_NOT_FOUND,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
