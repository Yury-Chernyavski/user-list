import { AxiosResponse } from "axios";
import instance from "../api";
import { ILoginResponse, IRegisterRequest, IUser } from "../models";
import { Path } from "../constants";

export default class AuthService {
  static async register(data: IRegisterRequest): Promise<AxiosResponse<IUser>> {
    return instance.post<IUser>(Path.REGISTER, data);
  }

  static async login(email: string, password: string): Promise<AxiosResponse<ILoginResponse>> {
    return instance.post<ILoginResponse>(Path.LOGIN, {
      email,
      password
    });
  }

  static logout(): void {
    localStorage.removeItem("token");
  }
}
