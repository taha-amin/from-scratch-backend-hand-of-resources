const pool = require('../utils/pool');

class Athlete {
  id;
  name;
  team;
  sport;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.team = row.team;
    this.sport = row.sport;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM athletes');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from athletes WHERE id = $1', [
      id,
    ]);
    if (!rows) return null;
    return new Athlete(rows[0]);
  }

  static async insert({ name, team, sport }) {
    const { rows } = await pool.query(
      'INSERT INTO athletes (name, team, sport) VALUES ($1, $2, $3) RETURNING * ',
      [name, team, sport]
    );
    return new Athlete(rows[0]);
  }

  static async updateById(id, attrs) {
    const athlete = await Athlete.getById(id);
    if (!athlete) return null;
    const { name, team, sport } = { ...athlete, ...attrs };
    const { rows } = await pool.query(
      `UPDATE athletes
        SET name=$2, team=$3, sport=$4
        WHERE id=$1 RETURNING *`,
      [id, name, team, sport]
    );
    return new Athlete(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM athletes WHERE id = $1 RETURNING *',
      [id]
    );
    return new Athlete(rows[0]);
  }
}

module.exports = { Athlete };
