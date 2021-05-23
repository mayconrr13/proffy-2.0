import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;

  @media (min-width: 800px) {
    width: 40%;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 414px;
  height: 100%;

  padding: 2rem;
  margin: 0 auto;

  position: relative;

  > strong {
    font-size: 1.5rem;
    font-family: 'Poppins';
    font-weight: 600;

    margin-right: auto;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 800px) {
    > strong {
      font-size: 2.25rem;
    }
  }
`;

export const Form = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > a {
    margin-left: auto;
    margin-top: 1.5rem;

    font-size: 0.75rem;
    color: var(--text-complement);

    transition: color 0.2s;

    &:hover {
      color: var(--text-complement-purple);
    }
  }
`;

export const AdditionalInformation = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;

  display: flex;
  align-items: baseline;
  justify-content: space-between;

  width: calc(100% - 2 * 2rem); //100% - margens

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
      font-size: 1rem;
      color: var(--text-base);
    }

    a {
      color: var(--purple);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  > span {
    font-size: 0.75rem;
    color: var(--text-complement);
    line-height: 0.75rem;

    img {
      margin-left: 0.25rem;
    }
  }
`;
