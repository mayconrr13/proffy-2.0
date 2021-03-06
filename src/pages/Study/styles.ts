import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  min-width: 320px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 4rem;
`;

export const TopWrapper = styled.div`
  width: 100%;
  background-color: var(--purple);

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    height: 300px;
  }
`;

export const InformationContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  margin: 0 auto;

  @media (min-width: 600px) {
    padding: 2.5rem 2rem 0 2rem;
  }
`;

export const InformationSection = styled.section`
  padding: 2.5rem 0 5rem 0;
  margin: 0 auto;

  width: 100%;
  max-width: 750px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > div {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 1.5rem;

    h1 {
      font-size: 1.5rem;
      font-family: 'Archivo';
      color: var(--text-title-purple);
    }

    > div {
      display: flex;
      align-items: center;

      img {
        width: 1.5rem;
        height: auto;

        margin-right: 1rem;
      }

      span {
        font-size: 0.75rem;
        color: var(--text-base-purple);
      }
    }
  }

  @media (min-width: 600px) {
    padding: 0;
    max-width: 750px;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        font-size: 2.25rem;
      }

      p {
        font-size: 1rem;
        color: var(--text-base-purple);
      }

      div {
        display: flex;
        align-items: center;

        span {
          font-size: 0.75rem;
          color: var(--text-base-purple);

          margin-left: 1rem;
        }
      }
    }
  }
`;

export const FilterOptionsSection = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    > span {
      color: var(--text-base-purple);
      font-weight: 400;
      font-size: 0.75rem;

      margin-right: auto;
      margin-bottom: 0.5rem;
    }

    div {
      width: 100%;
    }
  }

  > div {
    display: flex;
    align-items: center;
    width: 100%;

    margin-top: 1rem;

    section + section {
      margin-left: 1rem;
    }
  }

  button {
    width: 100%;
    height: 3.5rem;
    margin-top: 1rem;
    background-color: var(--green);
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    color: #ffffff;

    &:hover {
      filter: brightness(0.8);
    }
  }

  @media (min-width: 600px) {
    flex-direction: row;

    margin-top: auto;
    margin-bottom: -1.25rem;

    > div {
      margin-top: 0;
      margin-left: 1rem;

      width: 150%;
    }

    button {
      margin-top: auto;
      margin-left: 1rem;
      width: 20%;
    }
  }
`;

export const TeachersContainer = styled.main`
  padding: 0 2rem 3rem 2rem;

  > p {
    margin: 5rem auto;
    text-align: center;
    font-weight: 600;
  }

  > article + article {
    margin-top: 1.5rem;
  }

  @media (min-width: 600px) {
    margin-top: 2.5rem;
  }
`;
