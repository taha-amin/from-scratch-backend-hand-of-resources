const pool = require('../utils/pool');

class City {
  id;
  name;
  population;
  motto;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.population = row.population;
    this.motto = row.motto;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cities');
    return rows;
  }
}

module.exports = { City };
