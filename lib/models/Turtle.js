const pool = require('../utils/pool');

class Turtle {
  id;
  name;
  color;
  weapon;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.weapon = row.weapon;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM turtles');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from turtles WHERE id = $1', [
      id,
    ]);
    if (!rows) return null;
    return new Turtle(rows[0]);
  }

  static async insert({ name, color, weapon }) {
    const { rows } = await pool.query(
      'INSERT INTO turtles (name, color, weapon) VALUES ($1, $2, $3) RETURNING * ',
      [name, color, weapon]
    );
    return new Turtle(rows[0]);
  }
}

module.exports = { Turtle };
