import styled from "styled-components";
import { theme } from "../../theme/theme";

export const MainHeaderStyles = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 70px 1fr 1fr 120px;
  padding: 0 40px;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid ${theme.colors.text};
  margin-bottom: 50px;

  & .user {
    grid-column: 2;
    align-self: center;
  }
`
