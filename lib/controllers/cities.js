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
  })

  .post('/', async (req, res) => {
    const data = await City.insert(req.body);
    res.json(data);
  })

  .put('/:id', async (req, res) => {
    const data = await City.updateById(req.params.id, req.body);
    res.json(data);
  })

  .delete('/:id', async (req, res) => {
    const data = await City.delete(req.params.id);

    res.json(data);
  });
