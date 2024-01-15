import { FC, useEffect } from "react";
import { Main } from "../../theme/components";
import { Header, MainHeader, UserItem } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllUsers } from "../../store/selectors/getAllUsers";
import { fetchUsers } from "../../store/reducers/allUsersSlice";
import { setUser } from "../../store/reducers/userSlice";
import { getUserData } from "../../store/selectors/getUserData";

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const mainUser = localStorage.getItem("data");
  const { usersListData } = useAppSelector(getAllUsers);
  const { userData } = useAppSelector(getUserData);
  const usersList = usersListData?.data.filter(user => user.id !== userData?.id);

  useEffect(() => {
    mainUser && dispatch(setUser(JSON.parse(mainUser)));
  }, []);

  useEffect(() => {
    dispatch(fetchUsers({ per_page: 20 }));
  }, []);

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
