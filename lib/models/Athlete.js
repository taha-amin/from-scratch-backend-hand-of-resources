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
}

module.exports = { Athlete };
