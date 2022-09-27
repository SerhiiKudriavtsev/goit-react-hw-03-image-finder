import propTypes from 'prop-types';
import { Container, Text } from './Message.styled';

const Message = ({ text }) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

Message.propTypes = {
  text: propTypes.string.isRequired,
};

export default Message;