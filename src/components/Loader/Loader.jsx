import { Container } from 'components/Message/Message.styled';
import { MagnifyingGlass } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Container>
      <MagnifyingGlass color="#2cb415" />
    </Container>
  );
};

export default Loader;