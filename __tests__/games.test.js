const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('game routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/games should return a list of games', async () => {
    const resp = await request(app).get('/games');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(3);
  });

  it('/games/:id should return the game detail', async () => {
    const resp = await request(app).get('/games/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'tic tac toe',
      players: 2,
      genre: 'paper and pencil',
    });
  });

  it('POST /games should create a new game', async () => {
    const resp = await request(app).post('/games').send({
      name: 'dots and boxes',
      players: 2,
      genre: 'paper and pencil',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('dots and boxes');
    expect(resp.body.players).toEqual(2);
    expect(resp.body.genre).toEqual('paper and pencil');
    expect(resp.body.id).not.toBeUndefined();
  });

  it('PUT /games/:id should update game', async () => {
    const resp = await request(app)
      .put('/games/1')
      .send({ genre: 'tic-tac-toe' });
    expect(resp.status).toEqual(200);
    expect(resp.body.genre).toEqual('tic-tac-toe');
  });

  it('DELETE /games/:id should delete a game', async () => {
    const resp = await request(app).delete('/games/1');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('1');

    const { body } = await request(app).get('/games/');
    expect(body.length).toBeLessThan(3);
  });

  afterAll(() => {
    pool.end();
  });
});
