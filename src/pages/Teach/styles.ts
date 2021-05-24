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
  height: 340px;
  background-color: var(--purple);

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    height: 420px;
  }
`;

export const InsideAppHeader = styled.div`
  width: 100%;
  height: 4rem;

  padding: 0 2rem;
  margin: 0 auto;

  background-color: var(--dark-purple);
  border: none;
  border-bottom: 1px solid var(--darker-purple);

  header {
    width: 100%;
    max-width: 1120px;
    height: 100%;

    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: var(--text-base-purple);
      font-family: 'Archivo';
      font-weight: 600;
      letter-spacing: 0ch.5px;
    }
  }
`;

export const InformationSection = styled.section`
  padding: 0 2rem 2.5rem 2rem;
  margin: auto;

  width: 100%;
  max-width: 750px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    font-size: 1.5rem;
    font-family: 'Archivo';
    color: var(--text-title-purple);

    margin-bottom: 1.5rem;
  }

  > div {
    width: 100%;

    p {
      font-size: 0.85rem;
      color: var(--text-base-purple);
    }

    div {
      display: none;
    }
  }

  @media (min-width: 600px) {
    padding: 0 0 2.5rem 0;

    h1 {
      font-size: 2.25rem;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

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

export const FormWrapper = styled.div`
  padding: 0 2rem;
`;

export const Form = styled.form`
  max-width: 750px;
  width: 100%;

  margin: -2.25rem 0 0 0;

  background-color: #ffffff;
  border: none;
  border-radius: 0.5rem;

  @media (min-width: 600px) {
    margin-top: -4rem;
  }
`;

export const FormContent = styled.div`
  padding: 1rem;

  h3 {
    font-size: 1.25rem;
    font-family: 'Archivo';
    font-weight: 600;

    margin-bottom: 0.5rem;
  }

  h3 ~ span {
    width: 100%;
    height: 1px;

    background-color: var(--text-input);

    display: block;
  }

  div ~ h3 {
    margin-top: 2.25rem;
  }

  > button {
    margin: 2.5rem 0 1.5rem 0;
    padding: 1rem;

    width: 100%;
  }

  @media (min-width: 600px) {
    padding: 2rem;
  }
`;

export const ContactSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    &:first-child {
      display: flex;
      align-items: center;
      width: 100%;

      margin-top: 1rem;

      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
      }

      h3 {
        font-size: 1.25rem;
        font-family: 'Archivo';
        margin-left: 1rem;
      }
    }
  }

  @media (min-width: 600px) {
    flex-direction: row;

    > div {
      &:first-child {
        img {
          width: 5rem;
          height: 5rem;
        }
      }

      &:last-child {
        margin-left: 1rem;
        width: 70%;
      }
    }
  }
`;

export const BiographyInput = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-top: 1rem;

  label {
    font-size: 0.75rem;
    color: var(--text-complement);
    margin-bottom: 0.25rem;
  }

  textarea {
    width: 100%;
    height: 20rem;

    padding: 1rem 1.5rem;
    border: 1px solid var(--text-input);

    border-radius: 0.5rem;
    outline: none;

    font-size: 0.85rem;
    color: var(--text-base);

    position: relative;
    display: block;

    resize: none;

    &:focus {
      border: 1px solid var(--text-base);
    }
  }
`;

export const ClassSection = ContactSection;

export const ScheduleContainer = styled.div`
  margin-bottom: 2.25rem;

  > section {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    margin-top: 2.25rem;

    button {
      border: none;
      background-color: transparent;
      padding: 0;

      font-size: 0.75rem;
      font-weight: 600;
      color: var(--purple);
    }
  }

  > span {
    width: 100%;
    height: 1px;

    background-color: var(--text-input);

    display: block;

    margin-bottom: 0.5rem;
  }

  > div + div {
    margin-top: 0.5rem;
  }
`;

export const ScheduleItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ScheduleDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    display: flex;
    align-items: center;

    div + div {
      margin-left: 1rem;
    }
  }

  @media (min-width: 600px) {
    flex-direction: row;

    section {
      margin-left: 1rem;
    }
  }
`;

export const DeleteScheduleSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  width: 100%;

  span {
    height: 1px;
    flex: 1;

    background-color: var(--text-input);
  }

  button {
    border: none;
    background-color: transparent;
    padding: 0 1rem;

    font-size: 0.75rem;
    font-weight: 600;
    color: var(--red);
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  padding: 2.25rem;

  border-top: 1px solid #e6e6f0;
  background-color: var(--information-background);

  button {
    width: 100%;
    padding: 1rem;

    border: none;
    border-radius: 0.5rem;
    background-color: var(--green);

    color: #ffffff;
    font-family: 'Archivo';
    font-weight: 600;

    transition: 0.2s filter ease-in;

    &:hover {
      filter: brightness(0.9);
    }
  }

  > div {
    display: none;
  }

  @media (min-width: 600px) {
    justify-content: space-between;

    button {
      max-width: 200px;
    }

    > div {
      display: flex;
      align-items: center;

      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        margin-left: 1rem;

        strong {
          color: var(--purple);
          font-size: 0.75rem;
        }

        span {
          color: var(--text-complement);
          font-size: 0.75rem;
        }
      }
    }
  }
`;
