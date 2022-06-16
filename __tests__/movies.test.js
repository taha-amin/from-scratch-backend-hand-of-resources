const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('movie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/movies should return a list of movies', async () => {
    const resp = await request(app).get('/movies');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(3);
  });

  afterAll(() => {
    pool.end();
  });
});
