import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state.value);
  };

  render() {
    return (
      <header>
        <form className={css.searchbarForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchbarBtn}></button>
          <input
            className={css.searchbarInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
