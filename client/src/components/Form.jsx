import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVideogame, getGenres } from '../../actions';
import styles from './Form.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);

  const [form, setForm] = useState({
    name: '',
    description: '',
    platforms: '',
    image: '',
    releaseDate: '',
    rating: '',
    genres: []
  });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (e) => {
    setForm({
      ...form,
      genres: [...form.genres, e.target.value]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVideogame(form));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Platforms</label>
        <input type="text" name="platforms" value={form.platforms} onChange={handleChange} />
      </div>
      <div>
        <label>Image URL</label>
        <input type="text" name="image" value={form.image} onChange={handleChange} />
      </div>
      <div>
        <label>Release Date</label>
        <input type="date" name="releaseDate" value={form.releaseDate} onChange={handleChange} />
      </div>
      <div>
        <label>Rating</label>
        <input type="number" name="rating" value={form.rating} onChange={handleChange} />
      </div>
      <div>
        <label>Genres</label>
        <select onChange={handleSelectChange}>
          {genres.map(g => (
            <option key={g.id} value={g.name}>{g.name}</option>
          ))}
        </select>
        <ul>
          {form.genres.map((g, index) => (
            <li key={index}>{g}</li>
          ))}
        </ul>
      </div>
      <button type="submit">Create Videogame</button>
    </form>
  );
};

export default Form;
