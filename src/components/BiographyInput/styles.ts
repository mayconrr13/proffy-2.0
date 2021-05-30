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

  position: relative;

  ${(props) =>
    props.isFocused &&
    css`
      &:before {
        content: '';
        position: absolute;
        bottom: 1px;
        left: 1rem;
        right: 1rem;
        z-index: 999;

        height: 2px;
        border-radius: 1px;
        background: var(--purple);
      }
    `}

  label {
    font-size: 0.75rem;
    color: var(--text-complement);
    margin-bottom: 0.25rem;
    margin-right: auto;
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
