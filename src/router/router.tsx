import { createBrowserRouter, Navigate } from "react-router-dom";
import { Path } from "../constants";
import { HomePage, LoginPage, RegisterPage } from "../pages";
import { PrivateRouter } from "./PrivateRouter";

export const router = createBrowserRouter([
  {
    path: `${Path.HOME}`,
    element: <PrivateRouter Component={HomePage} />
  },
  {
    path: `${Path.LOGIN}`,
    element: <LoginPage />
  },
  {
    path: `${Path.REGISTER}`,
    element: <RegisterPage />
  },
  {
    path: "*",
    element: <Navigate
      to={Path.HOME}
      replace
    />
  }
]);

