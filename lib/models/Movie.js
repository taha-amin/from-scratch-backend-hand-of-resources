const pool = require('../utils/pool');

class Movie {
  id;
  name;
  director;
  genre;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.director = row.director;
    this.genre = row.genre;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM movies');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from movies WHERE id = $1', [
      id,
    ]);
    console.log(rows);
    return new Movie(rows[0]);
  }
}

module.exports = { Movie };
