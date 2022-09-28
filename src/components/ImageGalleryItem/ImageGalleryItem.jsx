import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webImage, largeImage, tags, onClick }) => {
  return (
    <Item className="gallery-item">
      <Image src={webImage} alt={tags} onClick={() => onClick(largeImage)} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;