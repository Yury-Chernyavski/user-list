import { createBrowserRouter } from "react-router-dom";
import { Path } from "../constants";
import { HomePage, LoginPage, RegisterPage } from "../pages";

export const router = createBrowserRouter([
  {
    path: `${Path.HOME}`,
    element: <HomePage />
  },
  {
    path: `${Path.LOGIN}`,
    element: <LoginPage />
  },
  {
    path: `${Path.REGISTER}`,
    element: <RegisterPage />
  }
]);

