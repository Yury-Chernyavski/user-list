import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Path } from "../../constants";
import { Button } from "../../theme/components";
import { AddUserForm, UserItem } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hoocks";
import { getAllUsers } from "../../store/selectors/getAllUsers";
import { fetchUsers } from "../../store/reducers/allUsersSlice";
import { deleteUserData, setUser } from "../../store/reducers/userSlice";
import { getUserData } from "../../store/selectors/getUserData";

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localData: string | null = localStorage.getItem("data");

  const {
    usersListData,
    error,
    loading
  } = useAppSelector(getAllUsers);
  const { userData } = useAppSelector(getUserData);
  const usersList = usersListData?.data.filter(user => user.id !== userData?.id);


  useEffect(() => {
    if (!localStorage.getItem("token") || error) {
      navigate(Path.LOGIN);
    } else if (localData) {
      dispatch(setUser(JSON.parse(localData)));
    }
  }, []);

  // TODO доработать колличество отображаемых пользователей
  useEffect(() => {
    dispatch(fetchUsers({ per_page: 20 }));
  }, [dispatch]);


  const logoutHandler = () => {
    AuthService.logout();
    dispatch(deleteUserData());
    navigate(Path.LOGIN);
  };


  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          Welcome {userData?.first_name} {userData?.last_name}
          <Button
            className="secondary"
            onClick={logoutHandler}
          >Log out</Button>
          <div>
            <h2>Users</h2>
            {usersList?.length ?
              usersList.map(user => (
                <UserItem
                  key={user.id}
                  id={user.id}
                  first_name={user.first_name}
                  last_name={user.last_name}
                  email={user.email}
                  display_picture={user.display_picture}
                />
              )) : <Button className="secondary">Add user</Button>
            }
          </div>
          <AddUserForm />
        </div>
      )}
    </>
  );
};
