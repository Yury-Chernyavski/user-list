import { FC, FormEvent, useState, ChangeEvent } from "react";
import { IRegisterRequest } from "../../models";
import AuthService from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../constants";
import { Button, ErrorMessage, FormWrapper, Input, Text, Title } from "../../theme/components";
import { RegisterFormData } from "../../helpers/FormFields.helper";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/reducers/userSlice";

const initialState: IRegisterRequest = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: ""
};

export const RegisterForm: FC = () => {
  const [registerData, setRegisterData] = useState<IRegisterRequest>(initialState);
  const [registerErr, setRegisterErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await AuthService.register(registerData);
      localStorage.setItem("data", JSON.stringify(data));
      dispatch(setUser(data));
      if (registerErr) setRegisterErr("");
      navigate(Path.LOGIN);
    } catch (err) {
      const errMessage = (err as Error).message;
      console.error(errMessage);
      setRegisterErr("Register failed");
    }
  };

  return (
    <FormWrapper>
      <Title>Sing up</Title>
      <form
        onSubmit={(e) => registerHandler(e)}
        data-testid="Register-form"
      >
        {RegisterFormData.map(i => (
          <Input
            key={i.id}
            type={i.type}
            placeholder={i.title}
            value={registerData[i.value]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterData({
              ...registerData,
              [i.value]: e.target.value
            })}
          />
        ))}
        <Button
          className="primary"
          type="submit"
        >Sing up</Button>
      </form>
      <Text>Already have an account? <Link to="/login">Log in</Link>
      </Text>
      {registerErr && <ErrorMessage>{registerErr}</ErrorMessage>}
    </FormWrapper>
  );
};
