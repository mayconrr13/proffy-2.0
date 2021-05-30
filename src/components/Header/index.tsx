import { Container } from './styles';

import backArrowImg from '../../assets/back-inside-app.svg';
import logoImg from '../../assets/logo-inside-app.svg';

interface HeaderProps {
  pageName: string;
}

export const Header = ({ pageName }: HeaderProps): JSX.Element => {
  return (
    <Container>
      <div>
        <img src={backArrowImg} alt="Voltar" />
        <span>{pageName}</span>
        <img src={logoImg} alt="Logo" />
      </div>
    </Container>
  );
};
