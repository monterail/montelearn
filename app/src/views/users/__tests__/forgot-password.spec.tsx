import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";

import ForgotPassword from "../forgot-password";

import * as auth from "../../../services/auth";

jest.mock("../../../services/auth", () => ({
  forgotPassword: jest.fn(() => ({ data: { detail: "Password reset e-mail has been sent." } })),
}));

describe("ForgotPassword", () => {
  afterEach(() => cleanup);
  it("renders forgot password page correctly", async () => {
    const { findByRole, findByLabelText } = render(<ForgotPassword />);
    const buttonElement = await findByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/submit/i);

    expect(await findByLabelText(/email/i)).toBeInTheDocument();
  });

  it("allows users to send mail succesfully", async () => {
    const email = "davidbowie@email.com";
    const { findByLabelText, getByText, getByRole } = render(<ForgotPassword />);

    fireEvent.change(await findByLabelText(/email/i), {
      target: { value: email },
    });

    await waitFor(() => fireEvent.click(getByRole("button")));

    expect(auth.forgotPassword).toHaveBeenCalled();
    expect(auth.forgotPassword).toHaveBeenCalledWith(email);
    expect(getByText("Password reset e-mail has been sent.")).toBeInTheDocument();
  });
});
