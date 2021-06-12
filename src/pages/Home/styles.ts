import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  min-width: 320px;
  height: 100vh;
`;

export const TopSection = styled.div`
  width: 100%;
  height: 100%;
  max-height: 375px;

  background-color: var(--purple);

  @media (min-width: 600px) {
    height: 60vw;
    max-height: 650px;
  }
`;

export const HomeHeader = styled.header`
  min-width: 300px;
  max-width: 1120px;

  margin: 0 auto;
  padding: 1.5rem 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;

    > img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;

      margin-right: 1rem;
    }

    > a {
      color: var(--text-base-purple);
      height: 2.5rem;
      line-height: 2.5rem;

      transition: color 0.2s;

      &:hover {
        color: #fff;
      }
    }
  }

  > a,
  > button {
    margin-left: auto;
    color: var(--text-base-purple);
    height: 2.5rem;
    line-height: 2.5rem;

    border: none;
    background-color: transparent;

    transition: color 0.2s;

    &:hover {
      color: #fff;
    }
  }
`;

export const ApplicationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1120px;

  padding: 0 2rem;
  margin: 0 auto;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      &:first-child {
        width: 80px;
        margin-bottom: 1rem;
      }

      &:last-child {
        display: none;
      }
    }
  }

  > img {
    width: 100%;
    max-width: 350px;
    height: auto;
    margin-top: 1rem;
  }

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;

    > div {
      align-items: flex-start;
      width: 40%;
      margin-right: 2rem;

      > img {
        width: 100%;

        &:first-child {
          width: 100%;
          max-width: 440px;
        }

        &:last-child {
          max-width: 300px;
          display: inherit;
        }
      }
    }

    > img {
      width: 60%;
      max-width: 600px;
    }
  }

  @media (min-width: 900px) {
    margin-top: 2rem;
  }
`;

export const CallToActionSection = styled.div`
  margin: 3rem auto 0 auto;
  padding: 0 2rem 2rem 2rem;
  max-width: 1120px;
  width: 100%;

  display: flex;
  flex-direction: column;

  > span {
    color: var(--text-base);
    font-size: 1.25rem;
  }

  > div {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    flex: 1;

    p {
      color: var(--text-complement);
      font-size: 0.75rem;
      margin-top: 3rem;
    }
  }

  @media (min-width: 800px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    span {
      margin-right: auto;
    }

    div {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      margin-top: 0;

      p {
        margin: 0 2rem;
      }
    }
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  margin-top: 2rem;

  a {
    display: flex;
    flex-direction: column;
    flex: 1;

    border-radius: 0.5rem;
    padding: 1rem;

    transition: filter 0.2s;

    img {
      width: 2.5rem;
      height: auto;
      margin-bottom: 3rem;
    }

    span {
      font-weight: 700;
      font-family: Archivo;
      color: white;
      font-size: 1.25rem;
    }

    &:first-child {
      margin-right: 1rem;
      background-color: var(--purple);
    }

    &:last-child {
      background-color: var(--green);
    }

    &:hover {
      filter: brightness(0.9);
    }
  }

  @media (min-width: 900px) {
    max-width: calc(2 * 300px + 1rem);

    a {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      max-width: 300px;

      padding-top: 2rem;
      padding-bottom: 2rem;

      img {
        margin: 0 1rem 0 0;
      }

      span {
        margin: 0;
        font-size: 1.5em;
      }
    }
  }
`;
