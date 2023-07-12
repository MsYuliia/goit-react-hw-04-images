import React, { Component } from 'react';
import { getImages } from './Api/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    search: '',
    showModal: false,
    selectedImage: '',
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages(page, search);
    }
  }

  fetchImages = async (page, search) => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await getImages(search, page);
      if (hits.length === 0) {
        toast.error('There are no images found. Please, enter a valid value');
      }
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...hits],
          total: totalHits,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = search => {
    if (search.trim() === '') {
      return toast.warning('You wrote nothing');
    } else if (this.state.search !== search) {
      this.setState({ images: [], page: 1, search });
    }
  };

  handleLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  toggleModal = (largeImageURL = '') => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedImage: largeImageURL,
    }));
  };

  render() {
    const { isLoading, images, showModal, selectedImage, total, page } =
      this.state;
    const totalPage = Math.ceil(total / 12);

    return (
      <div className="app">
        <Searchbar onSearch={this.handleSearch} />
        {images.length > 0 && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPage > page && (
          <Button onLoadMore={this.handleLoadMore}></Button>
        )}
        {showModal && (
          <Modal onClickClose={this.toggleModal} image={selectedImage}></Modal>
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
  }
}
