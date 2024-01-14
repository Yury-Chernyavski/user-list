import { FC, FormEvent, useState, ChangeEvent } from "react";
import AuthService from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../constants";
import { Button, ErrorMessage, FormWrapper, Input, Text, Title } from "../../theme/components";
import { LoginFormData } from "../../helpers/FormFields.helper";
import { ILoginRequest } from "../../models";


const initialState: ILoginRequest = {
  email: "",
  password: ""
};

export const LoginForm: FC = () => {
  const [loginData, setLoginData] = useState(initialState);
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState("");


  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await AuthService.login(loginData.email, loginData.password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", loginData.email);
      if (loginErr) setLoginErr("");
      navigate(Path.HOME);
    } catch (err) {
      const errorMessage = (err as Error).message;
      console.error(errorMessage);
      setLoginErr(`Login failed`);
    }
  };

  return (
    <FormWrapper>
      <Title>Log in</Title>
      <form
        onSubmit={(e) => loginHandler(e)}
        data-testid="Login-form"
      >
        {LoginFormData.map(i => (
          <Input
            key={i.id}
            type={i.type}
            placeholder={i.title}
            value={loginData[i.value]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginData({
              ...loginData,
              [i.value]: e.target.value
            })}
          />
        ))}
        <Button
          className="primary"
          type="submit"
        >Login</Button>
        <Text>You {"don't"} have an account? <Link to="/register">Sing up</Link></Text>
      </form>
      {loginErr && <ErrorMessage>{loginErr}</ErrorMessage>}
    </FormWrapper>
  );
};
