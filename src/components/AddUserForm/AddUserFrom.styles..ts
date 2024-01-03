import styled from "styled-components";
import { theme } from "../../theme/theme";

export const AddUserFromStyles = styled.div`
  position: absolute;
  top: 80px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 60%);
  
  & svg {
    position: absolute;
    top: 20px;
    right: 20px;
    fill: ${theme.colors.text};
    cursor: pointer;
  }
`;
