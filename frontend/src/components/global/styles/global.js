import { createGlobalStyle } from 'styled-components';
import '@fontsource/montserrat';
import '@fontsource/oswald';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to right, #14333D, #1F2626);
    margin: 0; /* Remove default margin */
    padding: 0; /* Remove default padding */
  }
  h1 {
    font-size: 75px;
    font-family: Oswald;
    text-align: center;
    color: #F3F3E7;
  }
  h2 {
    font-size: 32px;
    text-align: center;
    color: #F3F3E7;
  }
  p {
    font-size: 25px;
    text-align: center;
    color: #F3F3E7;
  }
  a {
    color: #CBCCAF;
  }
  main {
    flex: 2;
  }
  .container {
    display: flex;
    flex-direction: column;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  nav {
    height: auto;
  }

  .side-section {
    flex: 1;
  }

  @media (min-width: 769px) {
    .content {
      flex-direction: row;
    }
  }
  @media (max-width: 768px) {
    /* Media query for smaller screens */
    h1 {
      font-size: 48px; /* Adjust to your preference */
    }
    h2 {
      font-size: 24px; /* Adjust to your preference */
    }
    p {
      font-size: 18px; /* Adjust to your preference */
    }
  }
`;

export default GlobalStyle;
