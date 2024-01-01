import { FC } from "react";
import { UserItemStyle } from "./UserItem.style";
import { IUser } from "../../models";
import { Button } from "../../theme/components";
import { useAppDispatch } from "../../store/hoocks";
import { deleteUser } from "../../store/reducers/allUsersSlice";

export const UserItem: FC<IUser> = ({
  id,
  email,
  last_name,
  first_name,
  display_picture
}) => {
  const dispatch = useAppDispatch();

  const deletedHandler = async (id: number): Promise<void> => {
    try {
      dispatch(deleteUser(id));
    } catch (err) {
      const errMessage = (err as Error).message;
      throw new Error(errMessage);
    }
  };

  return (
    <UserItemStyle>
      <img
        alt="profile"
        src={display_picture}
      />
      <p>{first_name} {last_name}</p>
      <p>{email}</p>
      <Button onClick={() => deletedHandler(id)}>Delete</Button>
    </UserItemStyle>
  );
};
