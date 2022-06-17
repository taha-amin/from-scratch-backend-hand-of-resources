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
    if (!rows) return null;
    return new Movie(rows[0]);
  }

  static async insert({ name, director, genre }) {
    const { rows } = await pool.query(
      'INSERT INTO movies (name, director, genre) VALUES ($1, $2, $3) RETURNING * ',
      [name, director, genre]
    );
    return new Movie(rows[0]);
  }

  static async updateById(id, attrs) {
    const movie = await Movie.getById(id);
    if (!movie) return null;
    const { name, director, genre } = { ...movie, ...attrs };
    const { rows } = await pool.query(
      `UPDATE movies
        SET name=$2, director=$3, genre=$4
        WHERE id=$1 RETURNING *`,
      [id, name, director, genre]
    );
    return new Movie(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM movies WHERE id = $1 RETURNING *',
      [id]
    );
    return new Movie(rows[0]);
  }
}

module.exports = { Movie };
