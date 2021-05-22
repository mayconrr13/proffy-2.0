import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --purple: #8257E5;
    --green: #04D361;
    --red: #E33D3D;

    --text-title: #32264D;
    --text-base: #6A6180;
    --text-complement: #9C98A6;
    --text-input: #C1BCCC;

    --text-title-purple: #ffffff;
    --text-base-purple: #D4C2FF;
    --text-complement-purple: #A380F6;

    --background: #F0F0F7;
  }

  body {
    background: var(--background);
    overflow-x: hidden;
  }

  body, input, textarea, select, button, a {
    font: 400 1rem "Poppins", sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
