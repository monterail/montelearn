import { render, fireEvent, screen, waitFor, cleanup } from "@testing-library/react";

import Login from "../login";

import * as auth from "../../../services/auth";

import { withTestRouter } from "../../../utils/helpers/withTestRouter";

jest.mock("../../../services/auth", () => ({
  login: jest.fn(),
}));

describe("Login", () => {
  afterEach(() => cleanup);
  it("renders login form", async () => {
    const { findByRole, findByLabelText } = render(<Login />);
    const emailInputElement = await findByLabelText(/email/i);
    const passwordInputElement = await findByLabelText(/password/i);
    const buttonElement = await findByRole("button");

    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/login/i);
  });

  it("renders register", async () => {
    const { findByText } = render(<Login />);
    const registerLink = await findByText(/register/i);

    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveTextContent(/register/i);
  });

  it("renders reset password link", async () => {
    const { findByText } = render(<Login />);
    const resertPasswordLink = await findByText(/reset it now/i);

    expect(resertPasswordLink).toBeInTheDocument();
    expect(resertPasswordLink).toHaveTextContent(/reset it now/i);
  });

  it("allows users to login succesfully", async () => {
    const push = jest.fn();
    const loginWithRouter = withTestRouter(<Login />, {
      push,
      pathname: "/users/login",
      asPath: "/users/login",
    });
    const inputs: auth.LoginInputsType = {
      email: "example@email.com",
      password: "examplePassword",
    };

    render(loginWithRouter);

    await waitFor(() =>
      fireEvent.change(screen.getByPlaceholderText("e.g. james.wilson@mail.com"), {
        target: { value: inputs.email },
      }),
    );
    await waitFor(() =>
      fireEvent.change(screen.getByPlaceholderText("e.g. My$3creTP@ssVV0rD"), {
        target: { value: inputs.password },
      }),
    );
    await waitFor(() => fireEvent.click(screen.getByRole("button")));

    expect(auth.login).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/");
  });
});
