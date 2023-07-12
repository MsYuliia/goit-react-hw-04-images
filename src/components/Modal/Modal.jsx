import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDawn);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDawn);
  }

  handleKeyDawn = event => {
    if (event.code === 'Escape') {
      this.props.onClickClose();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClickClose();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img
            className={css.modalImg}
            src={this.props.image}
            alt="Here will be pic soon"
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
