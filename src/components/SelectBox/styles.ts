import styled, { css } from 'styled-components';

interface ContainerProps {
  isOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  height: 3.5rem;

  z-index: ${(props) => (props.isOpen ? 999 : 1)};

  div {
    width: 100%;
    height: 3.5rem;

    padding: 0 1.5rem;
    background-color: #ffffff;
    border-radius: ${(props) =>
      props.isOpen ? '0.5rem 0.5rem 0 0' : '0.5rem'};

    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    ${(props) =>
      props.isOpen
        ? css`
            border: 1px solid var(--text-base);
          `
        : css`
            border: 1px solid var(--text-input);
          `}
    border-bottom: ${(props) => props.isOpen && 'none'};

    span {
      line-height: 3.5rem;
      text-align: start;
      color: var(--text-base);
    }

    svg {
      width: 1.25rem;
      height: auto;
      color: var(--text-base);
      transform: rotate(${(props) => (props.isOpen ? '0deg' : '180deg')});
    }
  }

  ul {
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;

    height: calc(3.5rem * 3);
    overflow-y: auto;

    border-radius: 0 0 0.5rem 0.5rem;
    ${(props) =>
      props.isOpen
        ? css`
            border: 1px solid var(--text-base);
          `
        : css`
            border: 1px solid var(--text-input);
          `}
    border-top: none;

    cursor: pointer;

    transition: display ease-in-out 0.2s;

    li {
      list-style-type: none;

      width: 100%;
      height: 3.5rem;

      line-height: 3.5rem;
      text-align: start;
      padding-left: 2rem;
      color: var(--text-base);

      position: relative;

      border-top: 1px solid var(--text-base);

      &:last-child {
        border-radius: 0 0 0.5rem 0.5rem;
      }

      &:hover {
        font-weight: 600;
        background-color: var(--text-base-hover);

        &:before {
          content: '';
          position: absolute;
          width: 0.25rem;
          height: 80%;
          background-color: var(--purple);
          top: 10%;
          left: 0;
          border-radius: 0.125rem;
        }
      }
    }
  }

  @media (max-width: 700px) {
    > div {
      span {
        font-size: 0.875rem;
      }
    }

    ul {
      li {
        font-size: 0.875rem;
      }
    }
  }
`;
