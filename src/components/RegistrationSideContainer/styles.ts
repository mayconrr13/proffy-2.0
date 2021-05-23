import styled from 'styled-components';

import backgroundImg from '../../assets/form-pages-bg.svg';

export const Container = styled.div`
  display: none;

  @media (min-width: 800px) {
    display: inherit;

    width: 60%;
    height: 100%;

    background-color: var(--purple);

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      background-image: url(${backgroundImg});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: auto 90%;

      width: 100%;
      height: 100%;
      z-index: 999;

      img {
        margin: 0 auto;

        &:first-child {
          max-width: 340px;
          height: auto;

          margin-bottom: 1.5rem;
        }

        &:last-child {
          max-width: 240px;
          height: auto;
        }
      }
    }
  }
`;
