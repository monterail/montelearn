import { render } from "@testing-library/react";

import Register from "../register";

describe("Register", () => {
  it("renders register page correctly", async () => {
    const { findByText } = render(<Register />);
    await findByText("Email");
  });
});
