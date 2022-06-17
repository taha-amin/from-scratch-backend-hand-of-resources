const { Router } = require('express');
const { Turtle } = require('../models/Turtle');

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await Turtle.getAll();
    res.send(data);
  })

  .get('/:id', async (req, res) => {
    const data = await Turtle.getById(req.params.id);
    res.json(data);
  })

  .post('/', async (req, res) => {
    const data = await Turtle.insert(req.body);
    res.json(data);
  })

  .put('/:id', async (req, res) => {
    const data = await Turtle.updateById(req.params.id, req.body);
    res.json(data);
  });
