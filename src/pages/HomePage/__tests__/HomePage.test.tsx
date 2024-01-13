import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { act, render, screen } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import { Provider } from "react-redux";
import store from "../../../store/store";
import { HomePage } from "../HomePage";
import { BrowserRouter } from "react-router-dom";
import { fetchUsers } from "../../../store/reducers/allUsersSlice";
import { setUser } from "../../../store/reducers/userSlice";

const mockUserData = {
  id: 1,
  first_name: "Peter",
  last_name: "Peterson"
};

const mockUsersListData = {
  data: [
    {
      id: 2,
      first_name: "User",
      last_name: "1",
      email: "user1@example.com",
      display_picture: "path/to/image.jpg"
    },
    {
      id: 3,
      first_name: "User",
      last_name: "2",
      email: "user2@example.com",
      display_picture: "path/to/image.jpg"
    }
  ]
};


jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

jest.mock("../../../store/reducers/allUsersSlice", () => ({
  ...jest.requireActual("../../../store/reducers/allUsersSlice"),
  fetchUsers: jest.fn()
}));

// jest.mock("../../../store/reducers/userSlice", () => ({
//   // ...jest.requireActual("../../../store/reducers/userSlice"),
//   setUser: jest.fn()
// }));


describe("HomePage", () => {
  beforeEach(() => {
    const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");
    jest.spyOn(store, "dispatch").mockImplementation(jest.fn());

    mockedUseSelector.mockReturnValue({
      userData: mockUserData,
      usersListData: mockUsersListData
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

  });

  it("should render user list correctly", async () => {
    expect(screen.getByText("Peter Peterson")).toBeInTheDocument();
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 2")).toBeInTheDocument();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });


  it("dispatches fetchUsers on component mount", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(fetchUsers).toHaveBeenCalledWith({ per_page: 20 });
  });

});


