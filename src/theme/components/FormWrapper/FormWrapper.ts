import styled from "styled-components";
import { theme } from "../../theme";

interface IFromWrapper {
  className?: "addUser"
}

export const FormWrapper = styled.div<IFromWrapper>`
  width: 45%;
  min-width: 400px;
  min-height: auto;
  height: auto;
  background-color: ${theme.colors.lightBlack};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 45px 30px;
  
  position: relative;
  
  
  & button {
    margin-top: 20px;
  }
  
  & form {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  
  
  &.addUser {
    position: absolute;
    top: 85px;
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

    @media screen and (max-width: 768px) {

    }
  }
`;
