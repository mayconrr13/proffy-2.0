import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 4rem;

  padding: 0 2rem;
  margin: 0 auto;

  background-color: var(--dark-purple);
  border: none;
  border-bottom: 1px solid var(--darker-purple);

  div {
    width: 100%;
    max-width: 1120px;
    height: 100%;

    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      border: none;
      background-color: transparent;
      height: 100%;
      line-height: 100%;
    }

    span {
      color: var(--text-base-purple);
      font-family: 'Archivo';
      font-weight: 600;
      letter-spacing: 0.5px;
    }
  }
`;
