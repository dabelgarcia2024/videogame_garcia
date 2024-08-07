const { Router } = require('express');
const { Genre } = require('../models');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const genre = await Genre.findAll();
    res.json(genre);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los géneros' });
  }
});

module.exports = router;
