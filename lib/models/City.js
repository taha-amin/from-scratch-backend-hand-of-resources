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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from cities WHERE id = $1', [
      id,
    ]);
    if (!rows) return null;
    return new City(rows[0]);
  }

  static async insert({ name, population, motto }) {
    const { rows } = await pool.query(
      'INSERT INTO cities (name, population, motto) VALUES ($1, $2, $3) RETURNING * ',
      [name, population, motto]
    );
    return new City(rows[0]);
  }

  static async updateById(id, attrs) {
    const city = await City.getById(id);
    if (!city) return null;
    const { name, population, motto } = { ...city, ...attrs };
    const { rows } = await pool.query(
      `UPDATE cities
        SET name=$2, population=$3, motto=$4
        WHERE id=$1 RETURNING *`,
      [id, name, population, motto]
    );
    return new City(rows[0]);
  }
}

module.exports = { City };
