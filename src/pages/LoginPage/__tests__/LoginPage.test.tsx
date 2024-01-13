import { render } from "@testing-library/react";
import { LoginPage } from "../LoginPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../store/store";


describe("MainHeader", () => {
  it("Should render the LoginPage component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
