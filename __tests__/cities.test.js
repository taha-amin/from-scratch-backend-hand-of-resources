const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('city routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/cities should return a list of cities', async () => {
    const resp = await request(app).get('/cities');
    expect(resp.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
