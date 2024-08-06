import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideogameDetail } from '../../actions';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector(state => state.videogameDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {videogame && (
        <>
          <img src={videogame.image} alt={videogame.name} className={styles.image} />
          <h1>{videogame.name}</h1>
          <p>{videogame.description}</p>
          <p>Platforms: {videogame.platforms.join(', ')}</p>
          <p>Release Date: {videogame.releaseDate}</p>
          <p>Rating: {videogame.rating}</p>
          <p>Genres: {videogame.genres.join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default Detail;
