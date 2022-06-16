const { Router } = require('express');
const { Movie } = require('../models/Movie');

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await Movie.getAll();
    res.send(data);
  })

  .get('/:id', async (req, res) => {
    const data = await Movie.getById(req.params.id);
    res.json(data);
  })

  .post('/', async (req, res) => {
    const data = await Movie.insert(req.body);
    res.json(data);
  })

  .put('/:id', async (req, res) => {
    const data = await Movie.updateById(req.params.id, req.body);
    res.json(data);
  });
