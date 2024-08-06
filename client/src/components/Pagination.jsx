import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../actions';
import styles from './Pagination.module.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.currentPage);
  const totalPages = useSelector(state => state.totalPages);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? styles.active : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
