import { render } from "@testing-library/react";

import ForgotPassword from "../forgot-password";

describe("ForgotPassword", () => {
  it("renders correct correctly", async () => {
    const utils = render(<ForgotPassword />);
    console.log(utils);
  });
});
