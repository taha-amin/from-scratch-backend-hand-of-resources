const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('athlete routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('/athletes should return a list of athletes', async () => {
    const resp = await request(app).get('/athletes');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(3);
  });

  it.skip('/athletes/:id should return the athlete detail', async () => {
    const resp = await request(app).get('/athletes/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Ricky Lightfoot',
      team: 'Wales',
      sport: 'man vs horse racing',
    });
  });

  it.skip('POST /athletes should create a new athlete', async () => {
    const resp = await request(app).post('/athletes').send({
      name: 'Lebron James',
      team: 'Lakers',
      sport: 'basketball',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Lebron James');
    expect(resp.body.team).toEqual('Lakers');
    expect(resp.body.sport).toEqual('basketball');
    expect(resp.body.id).not.toBeUndefined();
  });

  it.skip('PUT /athletes/:id should update athlete', async () => {
    const resp = await request(app)
      .put('/athletes/2')
      .send({ team: 'united states of america' });
    expect(resp.status).toEqual(200);
    expect(resp.body.team).toEqual('united states of america');
  });

  it.skip('DELETE /athletes/:id should delete an athlete', async () => {
    const resp = await request(app).delete('/athletes/1');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('1');

    const { body } = await request(app).get('/athletes/');
    expect(body.length).toBeLessThan(3);
  });
});
