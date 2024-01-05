import styled from "styled-components";

export const HeaderStyles = styled.header`
  width: 100%;
  max-width: 1440px;
  position: relative;
  margin: 0 auto 30px;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & .userInfo {
    display: flex;
    align-items: center;
  }
  
  & .userPicture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  & .headerTitle {
    margin-right: 20px;
  }
  
  @media screen and (max-width: 425px) {
    flex-direction: column-reverse;
    align-items: flex-start;

    & .userInfo {
      width: 100%;
      justify-content: space-between;
    }
  }
`



