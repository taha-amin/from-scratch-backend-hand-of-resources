const { Router } = require('express');
const { Athlete } = require('../models/Athlete');

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await Athlete.getAll();
    res.send(data);
  })

  .get('/:id', async (req, res) => {
    const data = await Athlete.getById(req.params.id);
    res.json(data);
  })

  .post('/', async (req, res) => {
    const data = await Athlete.insert(req.body);
    res.json(data);
  });
