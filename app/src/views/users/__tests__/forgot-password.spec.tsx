import { render } from "@testing-library/react";

import ForgotPassword from "../forgot-password";

describe("ForgotPassword", () => {
  it("renders forgot password page correctly", async () => {
    const { findByText } = render(<ForgotPassword />);
    await findByText("Email");
  });
});
