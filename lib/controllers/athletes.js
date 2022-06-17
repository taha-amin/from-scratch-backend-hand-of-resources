const { Router } = require('express');
const { Athlete } = require('../models/Athlete');

module.exports = Router().get('/', async (req, res) => {
  const data = await Athlete.getAll();
  res.send(data);
});
