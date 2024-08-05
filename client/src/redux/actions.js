import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';

export const getVideogames = () => async (dispatch) => {
  const response = await axios.get('/videogames');
  dispatch({ type: GET_VIDEOGAMES, payload: response.data });
};
