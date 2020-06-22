import { render, fireEvent } from "@testing-library/react";

import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  getRefreshToken,
} from "../../../utils/helpers/auth";
import Login from "../login";

describe("Login", () => {
  const fakeUserResponse = {
    accessToken: "fake_access_user_token",
    refreshToken: "fake_refresh_user_token",
  };
  it("allows users to login succesfully", async () => {
    const { getByRole, getByLabelText } = render(<Login />);

    fireEvent.change(getByLabelText(/email/i), {
      target: { email: "chuck" },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { password: "norris" },
    });
    fireEvent.click(getByRole("button"));
    setAccessToken(fakeUserResponse.accessToken);
    setRefreshToken(fakeUserResponse.refreshToken);

    expect(getAccessToken()).toEqual(fakeUserResponse.accessToken);
    expect(getRefreshToken()).toEqual(fakeUserResponse.refreshToken);
  });

  it("allows users to logout succesfully", async () => {
    const { getByRole } = render(<Login />);

    fireEvent.click(getByRole("button"));
    setAccessToken(fakeUserResponse.accessToken);
    setRefreshToken(fakeUserResponse.refreshToken);

    expect(removeAccessToken()).toBeNull();
    expect(removeRefreshToken()).toBeNull();
  });
});
