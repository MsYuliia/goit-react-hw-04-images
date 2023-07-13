import React, { useEffect, useState } from 'react';
import { getImages } from './Api/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (query.trim() !== '') {
      fetchImages(page, query);
    }
  }, [query, page]);

  const fetchImages = async (page, query) => {
    setIsLoading(true);

    try {
      const { hits, totalHits } = await getImages(query, page);
      
      if (hits.length === 0) {
        toast.error('There are no images found. Please, enter a valid value');
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setTotal(totalHits);
    } catch (error) {
      console.error();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = search => {
    if (search.trim() === '') {
      return toast.warning('You wrote nothing');
    } else if (search !== query) {
      setImages([]);
      setPage(1);
      setQuery(search);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImageURL = '') => {
    setShowModal(prevState => !prevState);
    setLargeImage(largeImageURL);
  };

  const totalPage = Math.ceil(total / 12);

  return (
    <div className="app">
      <Searchbar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPage > page && (
        <Button onLoadMore={handleLoadMore}></Button>
      )}
      {showModal && (
        <Modal onClickClose={toggleModal} image={largeImage}></Modal>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
};
