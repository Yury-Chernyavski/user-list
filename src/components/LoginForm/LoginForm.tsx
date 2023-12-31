import { FC, FormEvent, useState } from "react";
import AuthService from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../constants";
import { Button, FormWrapper, Input, Text, Title } from "../../theme/components";
import { LoginFormData } from "../../helpers/FormFields.helper";
import { ILoginRequest } from "../../models";


const initialState: ILoginRequest = {
  email: "",
  password: ""
};

export const LoginForm: FC = () => {
  const [loginData, setLoginData] = useState(initialState);

  const navigate = useNavigate();
  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await AuthService.login(loginData.email, loginData.password);

      if (data) {
        localStorage.setItem("token", data.token);
        navigate(Path.HOME);
      }
    } catch (err) {
      const errorMessage = (err as Error).message;
      throw new Error(errorMessage);
    }
  };

  return (
    <FormWrapper>
      <Title>Log in</Title>
      <form onSubmit={(e) => loginHandler(e)}>
        {LoginFormData.map(f => (
          <Input
            key={f.id}
            type={f.type}
            placeholder={f.title}
            value={loginData[f.value]}
            onChange={e => setLoginData({
              ...loginData,
              [f.value]: e.target.value
            })}
          />
        ))}
        <Button
          className="primary"
          type="submit"
        >Login</Button>
        <Text>You {"don't"} have an account? <Link to="/register">Sing up</Link></Text>
      </form>
    </FormWrapper>
  );
};
