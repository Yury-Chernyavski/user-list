import { FC, useEffect } from "react";
import { Main } from "../../theme/components";
import { Header, MainHeader, UserItem } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllUsers } from "../../store/selectors/getAllUsers";
import { fetchUsers } from "../../store/reducers/allUsersSlice";
import { setUser } from "../../store/reducers/userSlice";
import { getUserData } from "../../store/selectors/getUserData";
import { useLocation } from "react-router-dom";

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();

  const { usersListData } = useAppSelector(getAllUsers);
  const { userData } = useAppSelector(getUserData);
  const usersList = usersListData?.data.filter(user => user.id !== userData?.id);
  const mainUser = usersListData?.data.find(user => user.email === state.email);
  localStorage.setItem("data", JSON.stringify(mainUser));

  useEffect(() => {
    dispatch(setUser(mainUser));
  }, [mainUser]);

  useEffect(() => {
    dispatch(fetchUsers({ per_page: 20 }));
  }, [dispatch]);

  return (
    <>
      {userData && <Header userData={userData} />}
      <Main>
        <MainHeader />
        {usersList?.map(user => (
          <UserItem
            key={user.id}
            {...user}
          />
        ))}
      </Main>
    </>
  );
};
