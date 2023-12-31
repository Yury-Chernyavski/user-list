import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Path } from "../../constants";
import { Button, Input } from "../../theme/components";
import { UserItem } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hoocks";
import { getUsers } from "../../store/selectors/getUsers";
import { addUser, fetchUsers } from "../../store/reducers/usersSlice";
import { TAddUser } from "../../models";

export const HomePage: FC = () => {
  const [newUsersData, setNewUsersData] = useState<TAddUser>({first_name: "", last_name: "", email: ""});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    usersList,
    error,
    loading
  } = useAppSelector(getUsers);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate(Path.LOGIN);
  }, []);

  // TODO доработать колличество отображаемых пользователей
  useEffect(() => {
    dispatch(fetchUsers({ per_page: 20 }));
  }, [dispatch]);

  const logoutHandler = () => {
    AuthService.logout();
    navigate(Path.LOGIN);
  };

  return (
    <div>
      Welcome
      <Button
        className="secondary"
        onClick={logoutHandler}
      >Log out</Button>
      <div>
        <h2>Users</h2>
        {usersList?.data.map(user => (
          <UserItem
            key={user.id}
            id={user.id}
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
            display_picture={user.display_picture}
          />
        ))}
      </div>
      {/*TODO переделать форму. Вынести ее  и открывать по клику на кнопку "Добавить"*/}
      <form onSubmit={() => dispatch(addUser(newUsersData))}>
        <Input
          type="text"
          value={newUsersData?.first_name}
          onChange={(e) => setNewUsersData({
            ...newUsersData,
            first_name: e.target.value
          })}
          placeholder="Name"
        />
        <Input
          type="text"
          value={newUsersData?.last_name}
          onChange={(e) => setNewUsersData({
            ...newUsersData,
            last_name: e.target.value,
          })}
          placeholder="Last name"
        />
        <Input
          type="email"
          value={newUsersData?.email}
          onChange={(e) => setNewUsersData({
            ...newUsersData,
            email: e.target.value,
          })}
          placeholder="Email"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
