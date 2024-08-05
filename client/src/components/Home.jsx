import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { getVideogames } from '../../redux/actions';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const [currentPage, setCurrentPage] = useState(1);
  const videogamesPerPage = 15;

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.home}>
      <div className={styles.cards}>
        {currentVideogames.map((vg) => (
          <Card key={vg.id} {...vg} />
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(videogames.length / videogamesPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
