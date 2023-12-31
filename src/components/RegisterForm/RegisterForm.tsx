import { FC, FormEvent, useState } from "react";
import { IRegisterRequest } from "../../models";
import AuthService from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../constants";
import { Button, FormWrapper, Input, Text, Title } from "../../theme/components";
import { RegisterFormData } from "../../helpers/FormFields.helper";

const initialState: IRegisterRequest = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: ""
};

export const RegisterForm: FC = () => {
  const [registerData, setRegisterData] = useState<IRegisterRequest>(initialState);
  const navigate = useNavigate();

  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await AuthService.register(registerData);
      localStorage.setItem("data", JSON.stringify(data));
      navigate(Path.LOGIN);
    } catch (err) {
      const errMessage = (err as Error).message;
      throw new Error(errMessage);
    }
  };

  return (
    <FormWrapper>
      <Title>Sing up</Title>
      <form onSubmit={(e) => registerHandler(e)}>
        {RegisterFormData.map(f => (
          <Input
            key={f.id}
            type={f.type}
            placeholder={f.title}
            value={registerData[f.value]}
            onChange={e => setRegisterData({
              ...registerData,
              [f.value]: e.target.value
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
    </FormWrapper>
  );
};
