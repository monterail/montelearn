import { render } from "@testing-library/react";

import ResetPassword from "../reset-password";

describe("ResetPassword", () => {
  it("renders reset password page correctly", async () => {
    const { findByText } = render(<ResetPassword uid="fake_id" token="fake_token" />);
    await findByText("Submit");
  });
});
