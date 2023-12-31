import React, { FC } from "react";
import { LoginForm } from "../../components";
import { Container } from "../../theme/components";

export const LoginPage: FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};
