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

  afterAll(() => {
    pool.end();
  });
});
