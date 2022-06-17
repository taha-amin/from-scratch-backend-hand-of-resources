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

  static async updateById(id, attrs) {
    const turtle = await Turtle.getById(id);
    if (!turtle) return null;
    const { name, color, weapon } = { ...turtle, ...attrs };
    const { rows } = await pool.query(
      `UPDATE turtles
        SET name=$2, color=$3, weapon=$4
        WHERE id=$1 RETURNING *`,
      [id, name, color, weapon]
    );
    return new Turtle(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM turtles WHERE id = $1 RETURNING *',
      [id]
    );
    return new Turtle(rows[0]);
  }
}

module.exports = { Turtle };
