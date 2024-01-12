import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "../Header";
import { Provider } from "react-redux";
import store from "../../../store/store";
import { BrowserRouter } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import * as action from "../../../store/reducers/userSlice";
import { deleteUserData } from "../../../store/reducers/userSlice";

const mockUser = {
  id: 1,
  first_name: "Peter",
  last_name: "Peterson",
  email: "peter@example.com",
  display_picture: "path/to/image.jpg"
};


describe("Header component", () => {
  beforeEach(() => {
    jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
    jest.spyOn(AuthService, "logout").mockImplementation(() => {});
    jest.spyOn(action, "deleteUserData");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header userData={mockUser} />;
        </BrowserRouter>
      </Provider>
    );
  });

  it("renders header with user data", () => {
    expect(screen.getByText("Peter Peterson")).toBeInTheDocument();
    expect(screen.getByTestId("addUserButton")).toBeInTheDocument();
    expect(screen.getByAltText("user picture")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("should open modal on 'add user' button click", () => {
    fireEvent.click(screen.getByTestId("addUserButton"));
    expect(screen.getByTestId("addUserForm")).toBeInTheDocument();
  });

  it("Should log out and deleted user data on 'Log out' button click", () => {
    fireEvent.click(screen.getByRole("button", { name: "Log out" }));
    expect(AuthService.logout).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(deleteUserData).toHaveBeenCalled();
  });
});
