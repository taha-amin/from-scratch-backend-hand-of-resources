const pool = require('../utils/pool');

class Game {
  id;
  name;
  players;
  genre;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.players = row.players;
    this.genre = row.genre;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM games');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from games WHERE id = $1', [
      id,
    ]);
    if (!rows) return null;
    return new Game(rows[0]);
  }

  static async insert({ name, players, genre }) {
    const { rows } = await pool.query(
      'INSERT INTO games (name, players, genre) VALUES ($1, $2, $3) RETURNING * ',
      [name, players, genre]
    );
    return new Game(rows[0]);
  }
}

module.exports = { Game };
