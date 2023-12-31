import { IUser } from "../IUser/IUser";

export type TAddUser = Pick<IUser, "first_name" | "last_name" | "email">;
