import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import {
  Container,
  HomeHeader,
  ApplicationInfo,
  CallToActionSection,
  TopSection,
  LinksContainer,
} from './styles';

import profileImg from '../../assets/profile-image.jpg';
import logoImg from '../../assets/logo.svg';
import descriptionImg from '../../assets/description.svg';
import homeImg from '../../assets/home-image.svg';
import heartImg from '../../assets/heart.svg';
import boardImg from '../../assets/board.svg';
import studyImg from '../../assets/study.svg';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export const Home = (): JSX.Element => {
  const { user } = useAuth();
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    const getNumberOfConnections = async () => {
      try {
        const response = await api.get('/connections');

        return setConnections(response.data.length);
      } catch (error) {
        return error.message;
      }
    };

    getNumberOfConnections();
  }, []);

  return (
    <Container>
      <TopSection>
        <HomeHeader>
          {Object.keys(user).length ? (
            <>
              <div>
                <img src={profileImg} alt="Professor" />
                <Link to="/profile">Severo Snape</Link>
              </div>
              <Link to="/home">Sair</Link>
            </>
          ) : (
            <>
              <Link to="/login">Log In</Link>
            </>
          )}
        </HomeHeader>

        <ApplicationInfo>
          <div>
            <img src={logoImg} alt="Logo" />
            <img src={descriptionImg} alt="Descrição" />
          </div>
          <img src={homeImg} alt="Aula" />
        </ApplicationInfo>
      </TopSection>

      <CallToActionSection>
        <span>
          Seja bem-vindo. <br /> <strong>O que deseja fazer?</strong>
        </span>

        <div>
          {connections ? (
            <p>
              Total de {connections} conexões <br /> já realizadas{'  '}
              <img src={heartImg} alt="Coração" />
            </p>
          ) : (
            <p />
          )}
          <LinksContainer>
            <Link to="/study">
              <img src={studyImg} alt="Estudar" />
              <span>Estudar</span>
            </Link>
            <Link to="/teach">
              <img src={boardImg} alt="Dar Aulas" />
              <span>Dar Aulas</span>
            </Link>
          </LinksContainer>
        </div>
      </CallToActionSection>
    </Container>
  );
};
