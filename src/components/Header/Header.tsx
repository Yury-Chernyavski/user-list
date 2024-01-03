import { FC } from "react";
import { Button, HeaderStyles, Text } from "../../theme/components";
import AuthService from "../../services/AuthService";
import { deleteUserData } from "../../store/reducers/userSlice";
import { Path } from "../../constants";
import { useAppDispatch } from "../../store/hoocks";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../models";


interface IHeader {
  userData: IUser
}

export const Header: FC<IHeader> = ({ userData }: IHeader) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    AuthService.logout();
    dispatch(deleteUserData());
    navigate(Path.LOGIN);
  };

  return (
    <HeaderStyles>
      <img
        className="userPicture"
        src={userData.display_picture}
        alt="user picture"
      />
      <Text className="headerTitle">{userData?.first_name} {userData?.last_name}</Text>
      <Button
        onClick={logoutHandler}
      >Log out</Button>
    </HeaderStyles>
  );
};
