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

  it('/cities/:id should return the city detail', async () => {
    const resp = await request(app).get('/cities/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Portland',
      population: 650380,
      motto: 'keep portland weird',
    });
  });

  it('POST /cities should create a new city', async () => {
    const resp = await request(app).post('/cities').send({
      name: 'Anchorage',
      population: 292090,
      motto: 'big wild life',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Anchorage');
    expect(resp.body.population).toEqual(292090);
    expect(resp.body.motto).toEqual('big wild life');
    expect(resp.body.id).not.toBeUndefined();
  });

  it('PUT /cities/:id should update city', async () => {
    const resp = await request(app)
      .put('/cities/2')
      .send({ motto: 'the city that works' });
    expect(resp.status).toEqual(200);
    expect(resp.body.motto).toEqual('the city that works');
  });

  it('DELETE /cities/:id should delete a city', async () => {
    const resp = await request(app).delete('/cities/3');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('3');

    const { body } = await request(app).get('/cities/');
    expect(body.length).toBeLessThan(3);
  });

  afterAll(() => {
    pool.end();
  });
});
