import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ image, onClickClose }) => {
  
  useEffect(() => {
    const handleKeyDawn = event => {
      if (event.code === 'Escape') {
        onClickClose();
      }
    };

    window.addEventListener('keydown', handleKeyDawn);
    return () => window.removeEventListener('keydown', handleKeyDawn);
  }, [onClickClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClickClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img className={css.modalImg} src={image} alt="Here will be pic soon" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
