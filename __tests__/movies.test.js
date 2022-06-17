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
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Blade Runner',
        director: 'Ridley Scott',
        genre: 'Science Fiction',
      },
      {
        id: '2',
        name: 'Fight Club',
        director: 'David Fincher',
        genre: 'psychological action drama',
      },
      {
        id: '3',
        name: 'Remember the Titans',
        director: 'Boaz Yakin',
        genre: 'Sports',
      },
    ]);
  });

  it('/movies/:id should return the movie detail', async () => {
    const resp = await request(app).get('/movies/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Blade Runner',
      director: 'Ridley Scott',
      genre: 'Science Fiction',
    });
  });

  it('POST /movies should create a new movie', async () => {
    const resp = await request(app).post('/movies').send({
      name: 'Forest Gump',
      director: 'Robert Zemeckis',
      genre: 'Comedy Drama',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Forest Gump');
    expect(resp.body.director).toEqual('Robert Zemeckis');
    expect(resp.body.genre).toEqual('Comedy Drama');
    expect(resp.body.id).not.toBeUndefined();
  });

  it('PUT /movies/:id should update movie', async () => {
    const resp = await request(app)
      .put('/movies/2')
      .send({ genre: 'dark comedy action drama' });
    expect(resp.status).toEqual(200);
    expect(resp.body.genre).toEqual('dark comedy action drama');
  });

  it('DELETE /movies/:id should delete a movie', async () => {
    const resp = await request(app).delete('/movies/1');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('1');

    const { body } = await request(app).get('/movies/');
    expect(body.length).toBeLessThan(3);
  });

  afterAll(() => {
    pool.end();
  });
});
