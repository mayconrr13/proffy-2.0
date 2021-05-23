import styled from 'styled-components';

import backgroundImgBigScreen from '../../assets/success-page-bg.svg';
import backgroundImgSmallScreen from '../../assets/form-pages-bg.svg';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--purple);

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    background-image: url(${backgroundImgSmallScreen});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 2rem;

    h1 {
      font-size: 2rem;
      font-weight: 700;
      font-family: 'Archivo';
      color: var(--text-title-purple);
      margin-top: 2.5rem;
    }

    p {
      font-size: 0.8rem;
      color: var(--text-base-purple);
      margin-top: 1.5rem;
      text-align: center;
      max-width: 450px;
    }

    button {
      padding: 1.25rem 2rem;
      margin-top: 5rem;

      border: none;
      border-radius: 0.5rem;

      background-color: var(--green);
      color: var(--text-title-purple);

      font-family: 'Archivo';
      font-weight: 600;

      transition: filter 0.2s ease-in;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }

  @media (min-width: 800px) {
    div {
      background-image: url(${backgroundImgBigScreen});
      background-size: cover;

      h1 {
        font-size: 3.5rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }
`;
