const { Router } = require('express');
const { Game } = require('../models/Game');

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await Game.getAll();
    res.send(data);
  })

  .get('/:id', async (req, res) => {
    const data = await Game.getById(req.params.id);
    res.json(data);
  })

  .post('/', async (req, res) => {
    const data = await Game.insert(req.body);
    res.json(data);
  })

  .put('/:id', async (req, res) => {
    const data = await Game.updateById(req.params.id, req.body);
    res.json(data);
  })

  .delete('/:id', async (req, res) => {
    const data = await Game.delete(req.params.id);

    res.json(data);
  });
