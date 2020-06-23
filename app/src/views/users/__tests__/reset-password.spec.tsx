import { render } from "@testing-library/react";

import ResetPassword from "../reset-password";

describe("ResetPassword", () => {
  it("renders correct correctly", async () => {
    const utils = render(<ResetPassword uid="fake_id" token="fake_token" />);
    await utils.findByTitle("Reset password");
  });
});
