import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 3.5rem;

  margin-top: 1.5rem;
  border: none;
  border-radius: 0.5rem;

  background-color: var(--green);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Archivo';

  transition: filter 0.2s linear;

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    background-color: #dcdce5;
  }
`;
