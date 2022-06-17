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

  it('/athletes/:id should return the athlete detail', async () => {
    const resp = await request(app).get('/athletes/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Ricky Lightfoot',
      team: 'Wales',
      sport: 'man vs horse racing',
    });
  });
});
