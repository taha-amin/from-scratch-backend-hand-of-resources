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

  it('/turtles/:id should return the turtle detail', async () => {
    const resp = await request(app).get('/turtles/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Leonardo',
      color: 'blue',
      weapon: 'two katanas',
    });
  });

  it('POST /turtles should create a new turtle', async () => {
    const resp = await request(app).post('/turtles').send({
      name: 'Venus de Milo',
      color: 'black',
      weapon: 'Tessen',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Venus de Milo');
    expect(resp.body.color).toEqual('black');
    expect(resp.body.weapon).toEqual('Tessen');
    expect(resp.body.id).not.toBeUndefined();
  });

  it('PUT /turtles/:id should update turtle', async () => {
    const resp = await request(app)
      .put('/turtles/3')
      .send({ weapon: 'grappling hook' });
    expect(resp.status).toEqual(200);
    expect(resp.body.weapon).toEqual('grappling hook');
  });

  afterAll(() => {
    pool.end();
  });
});
