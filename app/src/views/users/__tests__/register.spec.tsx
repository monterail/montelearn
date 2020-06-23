import { render } from "@testing-library/react";

import Register from "../register";

describe("Register", () => {
  it("renders correct correctly", async () => {
    const utils = render(<Register />);
    await utils.findByTitle("Ahoy you!");
  });
});
