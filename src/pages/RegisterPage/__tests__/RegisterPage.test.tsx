import { render } from "@testing-library/react";
import { RegisterPage } from "../RegisterPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../store/store";

describe("MainHeader", () => {
  it("Should render the RegisterPage component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
