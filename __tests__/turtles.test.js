const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('movie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/turtles should return a list of turtles', async () => {
    const resp = await request(app).get('/turtles');
    expect(resp.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
