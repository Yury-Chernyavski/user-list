import { ILoginRequest, IRegisterRequest } from "../models";

export interface IRegisterFormData {
  id: number,
  title: string
  type: string,
  value: keyof IRegisterRequest;
}

export interface ILoginFormData extends IRegisterFormData{
  value: keyof ILoginRequest
}

export const RegisterFormData: IRegisterFormData[] = [
  {id: 0, title: "First name", type: "text", value: "first_name"},
  {id: 1, title: "Last name", type: "text", value: "last_name"},
  {id: 2, title: "Email", type: "email", value: "email"},
  {id: 3,  title: "Password", type: "password", value: "password"},
  {id: 4, title: "Password confirmation", type: "password", value: "password_confirmation"},
];

export const LoginFormData: ILoginFormData[] = [
  {id: 0, title: "Email", type: "email", value: "email"},
  {id: 1,  title: "Password", type: "password", value: "password"},
];

