import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";

import ResetPassword from "../reset-password";

import * as auth from "../../../services/auth";

import { withTestRouter } from "../../../utils/helpers/withTestRouter";

jest.mock("../../../services/auth", () => ({
  resetPassword: jest.fn(() => ({ data: { detail: "Password changed successfully." } })),
}));

describe("ResetPassword", () => {
  afterEach(cleanup);
  const queryData = {
    uid: "fake_id",
    token: "fake_token",
  };

  it("renders reset password page correctly", async () => {
    const { findByRole, findByLabelText } = render(
      <ResetPassword uid={queryData.uid} token={queryData.token} />,
    );
    const buttonElement = await findByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/submit/i);

    expect(await findByLabelText(/^new\spassword$/i)).toBeInTheDocument();
    expect(await findByLabelText(/^confirm\spassword$/i)).toBeInTheDocument();
  });
  jest.useFakeTimers();

  it("renders password reset form form", async () => {
    const push = jest.fn();
    const inputs: auth.ChangePasswordInputs = {
      new_password1: "MoonageDaydreamOhYeah72",
      new_password2: "MoonageDaydreamOhYeah72",
    };
    const resetWithRouter = withTestRouter(
      <ResetPassword uid={queryData.uid} token={queryData.token} />,
      {
        push,
        pathname: "/users/reset-password",
        asPath: "/users/reset-password",
      },
    );
    const { getByText, findByLabelText, getByRole } = render(resetWithRouter);

    fireEvent.change(await findByLabelText(/^new\spassword$/i), {
      target: { value: inputs.new_password1 },
    });
    fireEvent.change(await findByLabelText(/^confirm\spassword$/i), {
      target: { value: inputs.new_password2 },
    });

    await waitFor(() => fireEvent.click(getByRole("button")));

    expect(auth.resetPassword).toHaveBeenCalled();
    expect(auth.resetPassword).toHaveBeenCalledWith({ ...inputs, ...queryData });
    expect(getByText("Password changed successfully.")).toBeInTheDocument();
    jest.runAllTimers();
    expect(push).toHaveBeenCalledWith("/users/login");
  });
});
