// src/actions/index.js

import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';

// Acción para obtener todos los videojuegos
export const getVideogames = () => async dispatch => {
  const response = await axios.get('/videogames');
  dispatch({ type: GET_VIDEOGAMES, payload: response.data });
};

// Acción para buscar videojuegos por nombre
export const searchVideogames = (name) => async dispatch => {
  const response = await axios.get(`/videogames/name?=${name}`);
  dispatch({ type: SEARCH_VIDEOGAMES, payload: response.data });
};
