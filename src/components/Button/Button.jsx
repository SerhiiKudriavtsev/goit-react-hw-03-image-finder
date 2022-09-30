import PropTypes from 'prop-types';
import { Container } from 'components/Message/Message.styled';
import { LoadMoreBtn } from './Button.styled';

const Button = ({ text, onClickBtn }) => {
  return (
    <Container>
      <LoadMoreBtn onClick={onClickBtn}>{text}</LoadMoreBtn>
    </Container>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;