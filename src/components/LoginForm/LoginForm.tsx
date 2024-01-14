import { ChangeEvent, FC, FormEvent, useState } from "react";
import AuthService from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../constants";
import { Button, ErrorMessage, FormWrapper, Input, Text, Title } from "../../theme/components";
import { LoginFormData } from "../../helpers/FormFields.helper";
import { IError, ILoginRequest } from "../../models";
import { AxiosError } from "axios";
import { checkError } from "../../helpers/checkError";


const initialState: ILoginRequest = {
  email: "",
  password: ""
};

export const LoginForm: FC = () => {
  const [loginData, setLoginData] = useState(initialState);
  const [loginErr, setLoginErr] = useState<IError>({});
  const navigate = useNavigate();


  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await AuthService.login(loginData.email, loginData.password);
      localStorage.setItem("token", data.token);
      if (loginErr) setLoginErr({});
      navigate(Path.HOME);
    } catch (err) {
      if (err instanceof AxiosError) {
        checkError(err, setLoginErr);
      }
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
          <div
            className="itemWrapper"
            key={i.id}
          >
            <Input
              type={i.type}
              placeholder={i.title}
              value={loginData[i.value]}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginData({
                ...loginData,
                [i.value]: e.target.value
              })}
            />
            {loginErr.errors && <ErrorMessage>{loginErr.errors[i.value]}</ErrorMessage>}
          </div>
        ))}
        <Button
          className="primary"
          type="submit"
        >Login</Button>
      </form>
      <Text>You {"don't"} have an account? <Link to="/register">Sing up</Link></Text>
      {loginErr.message && <ErrorMessage>{loginErr.message}</ErrorMessage>}
    </FormWrapper>
  );
};
