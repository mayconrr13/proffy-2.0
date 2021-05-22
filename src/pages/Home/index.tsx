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

export const Home = (): JSX.Element => {
  const user = false;

  return (
    <Container>
      <TopSection>
        <HomeHeader>
          {user ? (
            <>
              <div>
                <img src={profileImg} alt="Professor" />
                <a href="/profile">Severo Snape</a>
              </div>
              <a href="/home">Sair</a>
            </>
          ) : (
            <>
              <a href="/login">Log In</a>
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
          <p>
            Total de 285 conexões <br /> já realizadas
            <img src={heartImg} alt="Coração" />
          </p>
          <LinksContainer>
            <a href="/login">
              <img src={studyImg} alt="Estudar" />
              <span>Estudar</span>
            </a>
            <a href="/login">
              <img src={boardImg} alt="Dar Aulas" />
              <span>Dar Aulas</span>
            </a>
          </LinksContainer>
        </div>
      </CallToActionSection>
    </Container>
  );
};
