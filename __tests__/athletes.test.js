const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('athlete routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/athletes should return a list of athletes', async () => {
    const resp = await request(app).get('/athletes');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(3);
  });
});
