import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store/store";
import { UserItem } from "../UserItem";

const mockUser = {
  id: 1,
  first_name: "Peter",
  last_name: "Peterson",
  email: "peter@example.com",
  display_picture: "path/to/image.jpg"
};

describe("Render item of users", () => {
  it("Render components", async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(store, "dispatch").mockImplementation(mockDispatch);


    render(
      <Provider store={store}>
        <UserItem
          id={mockUser.id}
          first_name={mockUser.first_name}
          last_name={mockUser.last_name}
          email={mockUser.email}
          display_picture={mockUser.display_picture}
        />
      </Provider>
    );

    expect(screen.getByTestId("user-item")).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.first_name} ${mockUser.last_name}`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByAltText("profile")).toHaveAttribute("src", mockUser.display_picture);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
