import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/home" className={styles.link}>Home</Link>
      <Link to="/create" className={styles.link}>Create Videogame</Link>
      <SearchBar />
    </nav>
  );
};

export default NavBar;
