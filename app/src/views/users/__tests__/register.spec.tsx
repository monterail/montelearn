import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";

import Register from "../register";

import * as auth from "../../../services/auth";

import { withTestRouter } from "../../../utils/helpers/withTestRouter";

jest.mock("../../../services/auth", () => ({
  register: jest.fn(),
}));

describe("Register", () => {
  afterEach(() => cleanup);
  it("renders register page correctly", async () => {
    const { findByRole, findByLabelText } = render(<Register />);
    const buttonElement = await findByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/register/i);

    expect(await findByLabelText(/first\sname/i)).toBeInTheDocument();
    expect(await findByLabelText(/last\sname/i)).toBeInTheDocument();
    expect(await findByLabelText(/email/i)).toBeInTheDocument();
    expect(await findByLabelText(/^password$/i)).toBeInTheDocument();
    expect(await findByLabelText(/confirm\spassword/i)).toBeInTheDocument();
  });

  it("renders login link", async () => {
    const { findByText } = render(<Register />);
    const registerLink = await findByText(/login/i);

    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveTextContent(/login/i);
  });

  it("allows users to register succesfully", async () => {
    const push = jest.fn();
    const registerWithRouter = withTestRouter(<Register />, {
      push,
      pathname: "/users/register",
      asPath: "/users/register",
    });
    const inputs: auth.RegisterInputsType = {
      email: "davidbowie@email.com",
      password1: "MoonageDaydreamOhYeah72",
      password2: "MoonageDaydreamOhYeah72",
      first_name: "David",
      last_name: "Bowie",
    };

    const { findByLabelText, getByRole } = render(registerWithRouter);

    fireEvent.change(await findByLabelText(/email/i), {
      target: { value: inputs.email },
    });
    fireEvent.change(await findByLabelText(/^password$/i), {
      target: { value: inputs.password1 },
    });
    fireEvent.change(await findByLabelText(/confirm\spassword/i), {
      target: { value: inputs.password2 },
    });
    fireEvent.change(await findByLabelText(/first\sname/i), {
      target: { value: inputs.first_name },
    });
    fireEvent.change(await findByLabelText(/last\sname/i), {
      target: { value: inputs.last_name },
    });

    await waitFor(() => fireEvent.click(getByRole("button")));

    expect(auth.register).toHaveBeenCalledTimes(1);
    expect(auth.register).toHaveBeenCalledWith(inputs);
    expect(push).toHaveBeenCalledWith("/");
  });
});
