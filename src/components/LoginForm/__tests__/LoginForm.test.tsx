import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/store";
import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "../LoginForm";
import AuthService from "../../../services/AuthService";

const mockData = {
  email: "peter@example.com",
  password: "password123"
};


describe("LoginForm", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />;
        </BrowserRouter>
      </Provider>
    );
  })

  it("should render login form correctly", () => {
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("You don't have an account?")).toBeInTheDocument();
  });

  it("should handle login successfully", async () => {
    jest.spyOn(AuthService, "login").mockImplementation();
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: mockData.email } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: mockData.password } });
    fireEvent.submit(screen.getByTestId("Login-form"));

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith(mockData.email, mockData.password);
    });
  });

  it("should handle login failure", async () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "invalidPassword" } });
    fireEvent.submit(screen.getByTestId("Login-form"));

    await waitFor(() => {
      expect(screen.getByText("Login failed")).toBeInTheDocument();
    });
  });
});
