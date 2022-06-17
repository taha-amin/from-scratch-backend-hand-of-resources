const { Router } = require('express');
const { Game } = require('../models/Game');

module.exports = Router().get('/', async (req, res) => {
  const data = await Game.getAll();
  res.send(data);
});
