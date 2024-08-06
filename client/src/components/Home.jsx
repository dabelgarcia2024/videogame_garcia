import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideogames, getGenres } from '../../actions';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogames);
  const genres = useSelector(state => state.genres);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {/* Aquí puedes agregar tus filtros y opciones de ordenamiento */}
      </div>
      <div className={styles.cards}>
        {videogames.map(vg => (
          <Card key={vg.id} videogame={vg} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;


