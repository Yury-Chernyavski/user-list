import { IAllUsers, IUser, TAddUser } from "../models";
import instance from "../api";
import { ApiPath } from "../constants";
import { AxiosResponse } from "axios";

export default class UsersService {
  static async getAllUsers(per_page?: number, page?: number): Promise<AxiosResponse<IAllUsers>>{
    return await instance.get<IAllUsers>(ApiPath.USERS, {
      params: {
        per_page,
        page
      }
    });
  }

  static async addUser(data: TAddUser): Promise<IUser> {
    return instance.post(ApiPath.USERS, data);
  }

  static async deleteUser(id: number): Promise<void> {
    return instance.delete(`${ApiPath.USERS}/${id}`);
  }
}
