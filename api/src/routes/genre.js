const { Router } = require('express');
const { Genre } = require('../models');
const axios = require('axios');
const router = Router();

const { API_KEY } = process.env;

router.get('/', async (req, res) => {
  try {
    const genresInDb = await Genre.findAll();
    if (genresInDb.length === 0) {
      const apiGenresResponse = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      const apiGenres = apiGenresResponse.data.results;

      const genreInstances = await Genre.bulkCreate(apiGenres.map(g => ({
        id: g.id,
        name: g.name
      })));

      return res.json(genreInstances);
    }

    res.json(genresInDb);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
