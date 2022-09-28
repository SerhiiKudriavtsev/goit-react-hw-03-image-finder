import PropTypes from 'prop-types';
import { Container, Text } from './Message.styled';

const Message = ({ text }) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;