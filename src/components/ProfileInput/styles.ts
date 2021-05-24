import styled, { css } from 'styled-components';

interface ProfileInput {
  isFocused: boolean;
}

export const Container = styled.div<ProfileInput>`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-top: 1rem;

  label {
    font-size: 0.75rem;
    color: var(--text-complement);
    margin-bottom: 0.25rem;
    margin-right: auto;
  }

  input {
    width: 100%;

    padding: 1rem 1.5rem;

    ${(props) =>
      props.isFocused
        ? css`
            border: 1px solid var(--text-base);
          `
        : css`
            border: 1px solid var(--text-input);
          `}
    border-radius: 0.5rem;
    outline: none;

    font-size: 0.85rem;
    color: var(--text-base);

    position: relative;
    display: block;
  }
`;
