import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/store";
import { BrowserRouter } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { RegisterForm } from "../RegisterForm";


const mockUser = {
  first_name: "Peter",
  last_name: "Peterson",
  email: "peter@example.com",
  password: "password123",
  password_confirmation: "password123"
};

const mockError = {
  first_name: "This field is required",
  last_name: "This field is required",
  email: "This field is required",
  password: "This field is required",
  password_confirmation: "This field is required"
}

describe("RegisterForm", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm />;
        </BrowserRouter>
      </Provider>
    );
  });

  it("should render register form correct", () => {
    expect(screen.getByRole("heading", { name: "Sing up" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password confirmation")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sing up" })).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });

  it("should handle register successfully", async () => {
    jest.spyOn(AuthService, "register").mockImplementation();
    fireEvent.change(screen.getByPlaceholderText("First name"), { target: { value: mockUser.first_name } });
    fireEvent.change(screen.getByPlaceholderText("Last name"), { target: { value: mockUser.last_name } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: mockUser.email } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: mockUser.password } });
    fireEvent.change(screen.getByPlaceholderText("Password confirmation"), { target: { value: mockUser.password_confirmation } });
    fireEvent.submit(screen.getByTestId("Register-form"));
    await waitFor(() => {
      expect(AuthService.register).toHaveBeenCalledTimes(1);
    });

  });

  it("should handle register failure", async () => {
    jest.spyOn(AuthService, "register").mockRejectedValue(mockError);
    await act(async () =>  fireEvent.submit(screen.getByTestId("Register-form")));

    await waitFor(() => {
      expect(AuthService.register).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.findAllByText("This field is required")).toBeTruthy();
    });
  });
});
