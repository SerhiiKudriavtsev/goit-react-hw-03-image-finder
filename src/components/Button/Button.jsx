import { Container } from 'components/Message/Message.styled';
import { LoadMoreBtn } from './Button.styled';

const Button = ({ text, onClickBtn }) => {
  return (
    <Container>
      <LoadMoreBtn onClick={onClickBtn}>{text}</LoadMoreBtn>
    </Container>
  )
}

export default Button;