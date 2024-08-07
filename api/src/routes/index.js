const { Router } = require('express');
const videogameRouter = require('./videogame');
const genreRouter = require('./genre');

const router = Router();

// Configurar los routers
router.use('/videogame', videogameRouter);
router.use('/genre', genreRouter);

module.exports = router;
