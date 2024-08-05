import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { getVideogames } from '../../redux/actions';
import styles from './Home.module.css';
import SearchBar from '../SearchBar/SearchBar';


const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Videogames</h1>
      <SearchBar />
      <div className={styles.filters}>
        { const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);}
      </div>
      <div className={styles.gridContainer}>
        {videogames.map(game => (
          <VideogameCard key={game.id} game={game} />
        ))}
      </div>
      <div className={styles.pagination}>
        {  <div className={styles.home}>
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
        ))}}
      </div>
    </div>
  );


export default Home;
