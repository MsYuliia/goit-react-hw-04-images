import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, toggleModal }) => {
  const { webformatURL, tags, largeImageURL } = image;
  const handleClick = () => {
    toggleModal(largeImageURL);
  };

  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryImg}
        src={webformatURL}
        alt={tags}
        onClick={handleClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
