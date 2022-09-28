import React, { Component } from "react";
import { animateScroll as scroll } from 'react-scroll';
// import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from './Button/Button';
import Message from './Message/Message';
import ModalWindow from './ModalWindow/ModalWindow';
// import ImageGalleryInfo from './ImageGalleryInfo/ImageGalleryInfo';
import { fetchImagesAPI } from "servises/gallery-api";


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {

  state = {
    wordSearch: '',
    currentPage: 1,
    imagesArr: [],
    loading: false,
    status: 'idle',
    prePages: 20,
  }

  // componentDidMount() {
  //   console.log("componentDidMount")
  //   this.setState({loading: true});
  
  // }
  
  handleFormSubmit = (wordSearch) => {
    console.log("wordSearch", wordSearch);
    this.setState({
      wordSearch: wordSearch,
      currentPage: 1,
      // imagesArr: [],
    });
  }

  handlePrePeageChange = prePages => { 
    this.setState({
      prePages: prePages,
    });
  };
  
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    const { wordSearch, currentPage, prePages } = this.state;

    if (wordSearch === '') {
      return;
    }

    if (prevState.wordSearch === wordSearch &&
      prevState.prePages === prePages &&
      prevState.currentPage === currentPage) {
      return;
    }
    
    if (prevState.wordSearch !== wordSearch ||
      prevState.currentPage !== currentPage ||
      prevState.prePages !== prePages
      ) {
      if (currentPage === 1) {
        this.setState({
          imagesArr: [],
          status: Status.PENDING,
        });
      }
      this.fetchImages();

      if (currentPage > 1) {
        scroll.scrollToBottom();
      }
      return;
    }

    if (prevState.wordSearch === wordSearch &&
      prevState.prePages !== prePages
      ) {
      if (currentPage === 1) {
        this.setState({
          status: Status.PENDING,
        });
      }
      this.fetchImages();

      if (currentPage > 1) {
        scroll.scrollToBottom();
      }
    }
  }

  async fetchImages() {
    const { wordSearch, currentPage, prePages } = this.state;
    try {
      let { imagesArr, totalHits } = await fetchImagesAPI(wordSearch, currentPage, prePages);
      this.setState(prevState => ({
        imagesArr: [...prevState.imagesArr, ...imagesArr],
        totalHits: totalHits,
        status: Status.RESOLVED,
      }));
    } catch (error) {
      alert();
    }
  }

  LargeImages = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleChangeCurrentPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  

  // searchedImagesChange = searchedImages => {
  //   this.setState({ searchedImages });
  // }

  render() {
    const { imagesArr, currentPage, status, totalHits, modalImg, showModal, prePages } =
      this.state;
    const isEndGallery = currentPage > totalHits/prePages;
    return (
      <div>
        <Searchbar
          onSearchWord={this.handleFormSubmit}
          onPrePage={this.handlePrePeageChange}
        />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery imagesArr={imagesArr} onClickWord={this.LargeImages} />
        )}
        {status === 'resolved' && !isEndGallery && (
          <Button
            text={'Load more'}
            onClickBtn={this.handleChangeCurrentPage}
          />
        )}
        {imagesArr.length === 0 && status === 'resolved' && (
          <Message text="Nothing found.
          Change the search filter." />
        )}
        {status === 'rejected' && <Message text="Something went wrong!" />}
        {showModal && (
          <ModalWindow onClose={this.toggleModal} largeImage={modalImg} />
        )}
      </div>
    );
  }
  
};
