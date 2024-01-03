import styled from "styled-components";
import { theme } from "../../theme";

export const Input = styled.input`
  width: 90%;
  height: 45px;
  border-radius: 10px;
  margin: 10px auto;
  padding: 0 10px;
  background-color: ${theme.colors.text};
  border: 2px solid transparent;
  
  &::placeholder {
    color: ${theme.colors.darkBlack};
  }
  
  &:hover {
    background-color: white;
  }

  &:focus {
    outline: none;
    background-color: white;
    border-color: ${theme.colors.primary};
  }
`
