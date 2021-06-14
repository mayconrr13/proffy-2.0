import styled, { css } from 'styled-components';

interface InputProps {
  isFocused: boolean;
  isFirstInput: boolean;
  isLastInput: boolean;
}

export const Container = styled.div<InputProps>`
  position: relative;

  ${(props) =>
    props.isFocused &&
    css`
      &:before {
        content: '';
        position: absolute;
        top: calc(50% - 3rem / 2);
        left: 0;

        width: 2px;
        height: 3rem;
        border-radius: 1px;
        background: var(--purple);
      }
    `}

  input {
    padding: 0 1.5rem;
    padding-top: 1rem;

    width: 100%;
    height: 4.5rem;

    outline: none;
    color: var(--text-base);

    border: 1px solid var(--text-input);
    border-top-left-radius: ${({ isFirstInput }) =>
      isFirstInput ? '0.5rem' : 0};
    border-top-right-radius: ${({ isFirstInput }) =>
      isFirstInput ? '0.5rem' : 0};
    border-bottom-right-radius: ${({ isLastInput }) =>
      isLastInput ? '0.5rem' : 0};
    border-bottom-left-radius: ${({ isLastInput }) =>
      isLastInput ? '0.5rem' : 0};
  }

  span {
    pointer-events: none;
    color: var(--text-input);
    position: absolute;
    margin-left: 1.5rem;
    left: 0;
    top: 50%;
    transform-origin: 0 center;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    cursor: text;
  }

  input:focus + span,
  input:not(:placeholder-shown) + span {
    top: 0.75rem;
    -webkit-transform: scale(0.75) translateY(-10%);
    transform: scale(0.75) translateY(-10%);
  }

  input,
  span {
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    -webkit-transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  button {
    position: absolute;
    right: 1.5rem;
    top: calc(50% - 10px);

    border: none;
    background-color: transparent;
    outline: none;
  }
`;
