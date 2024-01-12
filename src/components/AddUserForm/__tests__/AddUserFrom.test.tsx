import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { AddUserForm } from "../AddUserForm";
import store from "../../../store/store";
import * as action from "../../../store/reducers/allUsersSlice"

const mockUser = {
  first_name: "Peter",
  last_name: "Peterson",
  email: "peter@example.com"
};

describe("AddUserForm Component", () => {
  const setAddUserIsOpenMock = jest.fn();
  beforeEach(() => {
    render(
      <Provider store={store}>
        <AddUserForm setAddUserIsOpen={setAddUserIsOpenMock} />
      </Provider>
    );
  })

  it("submits user form and closes modal", () => {
    const mockedAddUser = jest.spyOn(action, "addUser");
    const mockDispatch = jest.fn();
    jest.spyOn(store, "dispatch").mockImplementation(mockDispatch);

    fireEvent.change(screen.getByPlaceholderText("First name"), { target: { value: mockUser.first_name } });
    fireEvent.change(screen.getByPlaceholderText("Last name"), { target: { value: mockUser.last_name } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: mockUser.email } });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockedAddUser).toHaveBeenCalledWith(mockUser);
    expect(setAddUserIsOpenMock).toHaveBeenCalledWith(false);
  });

  it("should close modal on 'close' button click", () => {
    fireEvent.click(screen.getByTestId("close"));
    expect(setAddUserIsOpenMock).toHaveBeenCalledWith(false);
  });
});
