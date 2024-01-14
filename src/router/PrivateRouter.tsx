import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Path } from "../constants";

export const PrivateRouter = ({ Component }: { Component: FC }) => {
  const auth = useAuth();
  return auth ? <Component /> : <Navigate to={Path.LOGIN} />;
};

