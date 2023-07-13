import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setValue(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSearch(value);
  };

  return (
    <header>
      <form className={css.searchbarForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchbarBtn}></button>
        <input
          className={css.searchbarInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
