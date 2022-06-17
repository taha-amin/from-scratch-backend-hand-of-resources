const { Router } = require('express');
const { City } = require('../models/City');

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await City.getAll();
    res.send(data);
  })

  .get('/:id', async (req, res) => {
    const data = await City.getById(req.params.id);
    res.json(data);
  });
