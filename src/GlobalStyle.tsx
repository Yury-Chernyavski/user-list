import { createGlobalStyle } from "styled-components";
import { theme } from "./theme/theme";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: ${theme.colors.lightGrey};
    font-family: Inter, sans-serif;
    font-size: 16px;
    line-height: 1.2em;
    font-weight: 400;
    color: #2F313F;
  }
  
  a {
    text-decoration: none;
    color: ${theme.colors.secondary};
  }
`
