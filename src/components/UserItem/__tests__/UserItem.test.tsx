import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  beforeEach(() => {
    jest.spyOn(store, "dispatch").mockImplementation(jest.fn());

    render(
      <Provider store={store}>
        <UserItem {...mockUser} />
      </Provider>
    );
  })

  it("Render components", async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(store, "dispatch").mockImplementation(mockDispatch);

    expect(screen.getByTestId("user-item")).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.first_name} ${mockUser.last_name}`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByAltText("profile")).toHaveAttribute("src", mockUser.display_picture);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it('calls deletedHandler when delete button is clicked', async () => {
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
