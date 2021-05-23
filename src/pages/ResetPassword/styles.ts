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

  > a {
    position: absolute;
    top: 2rem;
    left: 2rem;
  }

  > strong {
    font-size: 1.5rem;
    font-family: 'Poppins';
    font-weight: 600;

    margin-right: auto;
    margin-bottom: 1.5rem;
  }

  > span {
    font-size: 1rem;
    color: var(--text-base);

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
`;
