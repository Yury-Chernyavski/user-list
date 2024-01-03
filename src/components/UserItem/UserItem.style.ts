import styled from "styled-components";
import { theme } from "../../theme/theme";

export const UserItemStyle = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr 1fr 120px;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 20px auto;
  padding: 10px 40px;
  background: linear-gradient(35deg, #2f2f2f 0%, ${theme.colors.lightBlack});
  border: 1px solid ${theme.colors.darkBlack};
  border-radius: 20px;
  transition: border-color 0.2s ease-out;

  &:hover {
    border: 1px solid ${theme.colors.text};
  }

  & .picture {
    border-radius: 50%;
    border: 2px solid ${theme.colors.text};
    width: 60px;
    height: 60px;
  }
  
  @media 
`
