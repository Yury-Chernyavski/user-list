import { FC, FormEvent, useState } from "react";
import AuthService from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../constants";
import { Button, FormWrapper, Input, Text, Title } from "../../theme/components";
import { LoginFormData } from "../../helpers/FormFields.helper";
import { ILoginRequest } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store/hoocks";
import { deleteError } from "../../store/reducers/allUsersSlice";
import { getAllUsers } from "../../store/selectors/getAllUsers";


const initialState: ILoginRequest = {
  email: "",
  password: ""
};

export const LoginForm: FC = () => {
  const [loginData, setLoginData] = useState(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector(getAllUsers);

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await AuthService.login(loginData.email, loginData.password);
      localStorage.setItem("token", data.token);
      if (error) dispatch(deleteError());
      navigate(Path.HOME);
    } catch (err) {
      const errorMessage = (err as Error).message;
      throw new Error(errorMessage);
    }
  };

  return (
    <FormWrapper>
      <Title>Log in</Title>
      <form onSubmit={(e) => loginHandler(e)}>
        {LoginFormData.map(i => (
          <Input
            key={i.id}
            type={i.type}
            placeholder={i.title}
            value={loginData[i.value]}
            onChange={e => setLoginData({
              ...loginData,
              [i.value]: e.target.value
            })}
          />
        ))}
        <Button className="primary" type="submit">Login</Button>
        <Text>You {"don't"} have an account? <Link to="/register">Sing up</Link></Text>
      </form>
    </FormWrapper>
  );
};
