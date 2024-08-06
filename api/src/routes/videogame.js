const { Router } = require('express');
const { Videogame, Genre } = require('../models');
const axios = require('axios');
const router = Router();

const API_KEY = process.env.API_KEY;
const API_URL = 'https://api.rawg.io/api/games';

// Rutas para obtener videojuegos
router.get('/', async (req, res) => {
  try {
    const apiResponse = await axios.get(`${API_URL}?key=${API_KEY}`);
    const apiVideogames = apiResponse.data.results.map(game => ({
      id: game.id,
      name: game.name,
      description: game.description_raw,
      platforms: game.platforms.map(p => p.platform.name),
      image: game.background_image,
      releaseDate: game.released,
      rating: game.rating,
      genres: game.genres.map(g => g.name),
    }));

    const dbVideogames = await Videogame.findAll({
      include: Genre,
    });

    const formattedDbVideogames = dbVideogames.map(game => ({
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms,
      image: game.image,
      releaseDate: game.releaseDate,
      rating: game.rating,
      genres: game.genres.map(g => g.name),
    }));

    const allVideogames = [...apiVideogames, ...formattedDbVideogames];
    res.json(allVideogames);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los videojuegos' });
  }
});

// Ruta para obtener detalles de un videojuego específico
router.get('/:idVideogame', async (req, res) => {
  const { idVideogame } = req.params;
  try {
    if (idVideogame.includes('-')) { // UUID v4 from DB
      const videogame = await Videogame.findByPk(idVideogame, {
        include: Genre,
      });
      if (!videogame) {
        return res.status(404).json({ message: 'Videojuego no encontrado en la base de datos' });
      }
      const formattedGame = {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        platforms: videogame.platforms,
        image: videogame.image,
        releaseDate: videogame.releaseDate,
        rating: videogame.rating,
        genres: videogame.genres.map(g => g.name),
      };
      return res.json(formattedGame);
    } else {
      const apiResponse = await axios.get(`${API_URL}/${idVideogame}?key=${API_KEY}`);
      const game = apiResponse.data;
      const formattedGame = {
        id: game.id,
        name: game.name,
        description: game.description_raw,
        platforms: game.platforms.map(p => p.platform.name),
        image: game.background_image,
        releaseDate: game.released,
        rating: game.rating,
        genres: game.genres.map(g => g.name),
      };
      return res.json(formattedGame);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los detalles del videojuego' });
  }
});

// Ruta para buscar videojuegos por nombre
router.get('/name', async (req, res) => {
  const { name } = req.query;
  try {
    const apiResponse = await axios.get(`${API_URL}?search=${name}&key=${API_KEY}`);
    const apiVideogames = apiResponse.data.results.slice(0, 15).map(game => ({
      id: game.id,
      name: game.name,
      description: game.description_raw,
      platforms: game.platforms.map(p => p.platform.name),
      image: game.background_image,
      releaseDate: game.released,
      rating: game.rating,
      genres: game.genres.map(g => g.name),
    }));

    const dbVideogames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: Genre,
    });

    const formattedDbVideogames = dbVideogames.map(game => ({
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms,
      image: game.image,
      releaseDate: game.releaseDate,
      rating: game.rating,
      genres: game.genres.map(g => g.name),
    }));

    const allVideogames = [...apiVideogames, ...formattedDbVideogames];

    if (allVideogames.length === 0) {
      return res.status(404).json({ message: 'No se encontraron videojuegos con ese nombre' });
    }

    res.json(allVideogames);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar los videojuegos' });
  }
});

router.post('/', async (req, res) => {
  // Lógica para crear un nuevo videojuego
});

module.exports = router;

