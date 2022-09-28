import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({imagesArr, onClickWord}) => {
  
  return (
    <Gallery>
      {imagesArr.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webImage={webformatURL}
            largeImage={largeImageURL}
            tags={tags}
            onClick={onClickWord}
          />
        );
      })}
  </Gallery>
  )
}

ImageGallery.propTypes = {
  imagesArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onClickWord: PropTypes.func.isRequired,
};

export default ImageGallery;