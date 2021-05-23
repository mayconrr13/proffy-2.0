import { Container } from './styles';

import logoImg from '../../assets/logo.svg';
import descriptionImg from '../../assets/description.svg';

export const RegistrationSideContainer = (): JSX.Element => {
  return (
    <Container>
      <div>
        <img src={logoImg} alt="Logo" />
        <img src={descriptionImg} alt="Descrição" />
      </div>
    </Container>
  );
};
