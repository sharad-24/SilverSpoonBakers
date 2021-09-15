import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Helvetica', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: white;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Helvetica, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
