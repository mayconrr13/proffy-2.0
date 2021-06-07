import { useHistory } from 'react-router';
import { Container } from './styles';

import backArrowImg from '../../assets/back-inside-app.svg';
import logoImg from '../../assets/logo-inside-app.svg';

interface HeaderProps {
  pageName: string;
}

export const Header = ({ pageName }: HeaderProps): JSX.Element => {
  const history = useHistory();
  return (
    <Container>
      <div>
        <button type="button" onClick={() => history.push('/')}>
          <img src={backArrowImg} alt="Voltar" />
        </button>
        <span>{pageName}</span>
        <img src={logoImg} alt="Logo" />
      </div>
    </Container>
  );
};
