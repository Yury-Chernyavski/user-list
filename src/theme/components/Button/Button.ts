import styled from "styled-components";
import { theme } from "../../theme";

export const Button = styled.button`
  width: 100px;
  height: 40px;
  margin: 10px;
  cursor: pointer;
  border-radius: 10px;
  background-color: transparent;
  border: 2px solid ${theme.colors.darkGrey};
  
  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: none;
  }
  
  
  &.primary {
    background-color: ${theme.colors.primary};
    border: none;
    color: ${theme.colors.white}
  }
  
  &.primary:hover {
    background-color: ${theme.colors.darkPrimary};
  }
  
  &.secondary {
    background-color: ${theme.colors.secondary};
    border: none;
    color: ${theme.colors.white};
  }
  
  &.secondary:hover {
    background-color: #cb4d21;
    border: none;
    color: ${theme.colors.white};
  }
`
