import { FC } from "react";
import { UserItemStyle } from "./UserItem.style";
import { IUser } from "../../models";
import { Button } from "../../theme/components";
import { useAppDispatch } from "../../store/hooks";
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
    <UserItemStyle data-testid="user-item">
      <img
        alt="profile"
        className="picture"
        src={display_picture}
      />
      <p className="title">{first_name} {last_name}</p>
      <p>{email}</p>
      <Button onClick={() => deletedHandler(id)}>Delete</Button>
    </UserItemStyle>
  );
};
