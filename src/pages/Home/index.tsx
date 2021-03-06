import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

import firebase from '../../services/firebase';

import {
  Container,
  HomeHeader,
  ApplicationInfo,
  CallToActionSection,
  TopSection,
  LinksContainer,
} from './styles';

import logoImg from '../../assets/logo.svg';
import descriptionImg from '../../assets/description.svg';
import homeImg from '../../assets/home-image.svg';
import heartImg from '../../assets/heart.svg';
import boardImg from '../../assets/board.svg';
import studyImg from '../../assets/study.svg';

export const Home = (): JSX.Element => {
  const { user, signOut } = useAuth();
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    const getNumberOfConnections = async () => {
      try {
        const totalConnections = await firebase
          .firestore()
          .collection('connections')
          .get();

        setConnections(totalConnections.docs.length);

        return;
      } catch (error) {
        console.log(error.message);
      }
    };

    getNumberOfConnections();
  }, []);

  return (
    <Container>
      <TopSection>
        <HomeHeader>
          {user ? (
            <>
              <div>
                <img src={user.avatar} alt="Professor" />
                <Link to="/profile">{`${user.name} ${user.lastName}`}</Link>
              </div>
              <button type="button" onClick={signOut}>
                Sair
              </button>
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
