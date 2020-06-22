import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import { login, LoginInputsType } from "../../../services/auth";
import Login from "../login";

jest.mock("../../../services/auth");

const fakeUserResponse = {
  accessToken: "fake_access_user_token",
  refreshToken: "fake_refresh_user_token",
};

describe("Login", () => {
  const inputs: LoginInputsType = {
    email: 'maciekhnat@gmail.com',
    password: 'haselkomaselko'
  }
  it("allows users to login succesfully", async () => {
    render(<Login />);

    await waitFor(() => fireEvent.change(screen.getByPlaceholderText("e.g. james.wilson@mail.com"), {
      target: { value: inputs.email }
    }));

    await waitFor(() => fireEvent.change(screen.getByPlaceholderText("e.g. My$3creTP@ssVV0rD"), {
      target: { value: inputs.password }
    }));

    await waitFor(() => fireEvent.click(screen.getByRole("button")))

    expect(login).toHaveBeenCalledWith(inputs)
  });
});
