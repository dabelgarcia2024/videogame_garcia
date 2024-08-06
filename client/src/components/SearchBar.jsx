import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesByName } from '../../actions';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getVideogamesByName(name));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
        className={styles.input}
        placeholder="Search videogames..."
      />
      <button type="submit" className={styles.button}>Search</button>
    </form>
  );
};

export default SearchBar;
