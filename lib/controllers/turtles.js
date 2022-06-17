const { Router } = require('express');
const { Turtle } = require('../models/Turtle');

module.exports = Router().get('/', async (req, res) => {
  const data = await Turtle.getAll();
  res.send(data);
});
