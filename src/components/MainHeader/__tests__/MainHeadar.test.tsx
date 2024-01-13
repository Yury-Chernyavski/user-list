import { render } from "@testing-library/react";
import { MainHeader } from "../MainHeader";

describe("MainHeader", () => {
  it("Should render the MainHeader component", () => {
    const component = render(<MainHeader />);

    expect(component).toMatchSnapshot();
  });
});
