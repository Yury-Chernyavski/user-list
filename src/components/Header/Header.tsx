import { FC, useState } from "react";
import { Button, HeaderStyles, Text } from "../../theme/components";
import AuthService from "../../services/AuthService";
import { deleteUserData } from "../../store/reducers/userSlice";
import { Path } from "../../constants";
import { useAppDispatch } from "../../store/hoocks";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../models";
import { AddUserForm } from "../AddUserForm/AddUserForm";


interface IHeader {
  userData: IUser;
}

export const Header: FC<IHeader> = ({ userData }: IHeader) => {
  const [addUserIsOpen, setAddUserIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    AuthService.logout();
    dispatch(deleteUserData());
    navigate(Path.LOGIN);
  };

  return (
    <HeaderStyles>
      <Button
        className="primary"
        onClick={() => setAddUserIsOpen(true)}
      >Add user</Button>
      {addUserIsOpen && <AddUserForm setAddUserIsOpen={setAddUserIsOpen} />}
      <div className="userInfo">
        <img
          src={userData.display_picture}
          alt="user picture"
          className="userPicture"
        />
        <Text className="headerTitle">{userData?.first_name} {userData?.last_name}</Text>
        <Button
          onClick={logoutHandler}
      >Log out</Button>
      </div>
    </HeaderStyles>
  );
};
