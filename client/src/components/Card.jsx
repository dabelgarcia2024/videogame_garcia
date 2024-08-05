import React from 'react';
import styles from './Card.module.css';

const Card = ({ name, image, genres }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.genres}>{genres.join(', ')}</p>
    </div>
  );
};

export default Card;
