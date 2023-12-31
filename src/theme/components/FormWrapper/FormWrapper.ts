import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 450px;
  min-height: 400px;
  height: auto;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  
  & button {
    margin-top: 20px;
  }
  
  & form {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;
