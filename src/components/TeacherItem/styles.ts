import styled, { css } from 'styled-components';

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 750px;

  background-color: #ffffff;
  border: 1px solid var(--text-input);

  margin: -2.5rem auto 0 auto;
  border-radius: 0.5rem;

  > section {
    padding: 1.5rem;
  }

  @media (min-width: 600px) {
    margin: 0 auto;
  }
`;

export const DetailsSection = styled.section`
  width: 100%;

  > div {
    &:first-child {
      display: flex;
      align-items: center;

      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: aliceblue;

        margin-right: 1rem;
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        strong {
          font-size: 1.25rem;
          font-family: 'Archivo';
        }

        span {
          font-size: 0.75rem;
          color: var(--text-base);
        }
      }
    }

    &:nth-child(2) {
      margin: 1.5rem 0;
    }

    &:nth-child(3) {
      display: flex;
      flex-direction: column;
      align-items: stretch;

      article + article {
        margin-top: 0.5rem;
      }
    }
  }

  @media (min-width: 650px) {
    > div {
      &:nth-child(3) {
        flex-direction: row;

        article + article {
          margin-top: 0;
          margin-left: 0.5rem;
        }
      }
    }
  }
`;

interface TeacherScheduleProps {
  isAvailable: boolean;
}

export const TeacherSchedule = styled.article<TeacherScheduleProps>`
  width: 100%;
  position: relative;

  background-color: var(--information-background);
  border: 1px solid var(--text-input);
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;

  > div {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      color: var(--text-complement);
      font-size: 0.75rem;

      margin-bottom: 0.5rem;
    }

    strong {
      font-family: 'Archivo';
    }
  }

  img {
    margin: 0 auto;
  }

  > span {
    ${(props) =>
      !props.isAvailable
        ? css`
            width: 100%;
            height: 100%;

            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;

            background-color: #fafafc50;
            border-radius: 0.5rem;
          `
        : css`
            display: none;
          `}
  }

  @media (min-width: 650px) {
    flex-direction: column;

    img {
      display: none;
      margin: 0;
    }

    > div {
      &:last-child {
        margin-top: 1rem;
      }
    }
  }
`;

export const ContactSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  background-color: var(--information-background);
  border-top: 1px solid var(--text-input);
  border-radius: 0 0 0.5rem 0.5rem;

  div {
    width: 100%;
    margin-bottom: 1rem;

    span {
      color: var(--text-complement);
      font-size: 0.875rem;

      margin-right: 1rem;
    }

    strong {
      color: var(--purple);
      font-size: 1.25rem;
    }
  }

  button {
    width: 100%;
    height: 3.5rem;

    background-color: var(--green);
    border: none;
    border-radius: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin-right: 1rem;
    }

    span {
      font-size: 1rem;
      font-family: 'Archivo';
      font-weight: 600;
      color: #ffffff;
    }
  }

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;

    > div {
      margin-bottom: 0;
    }
  }
`;
