import styled from "styled-components";
import { theme } from "../../theme";

export const Input = styled.input`
  width: 90%;
  height: 45px;
  border-radius: 10px;
  margin: 10px auto;
  padding: 0 10px;
  border: 2px solid ${theme.colors.darkGrey};
  &::placeholder {
    color: ${theme.colors.darkGrey};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`
