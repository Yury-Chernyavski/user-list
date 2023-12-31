import { IUser } from "../IUser/IUser";

export interface IAllUsers {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  data: IUser[];
}
