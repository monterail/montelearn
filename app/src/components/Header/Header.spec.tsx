import React from "react";
import { render, cleanup } from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  afterEach(() => cleanup);

  // link redirects aren't tested because of this issue: https://github.com/vercel/next.js/issues/12371
  describe("user is logged in", () => {
    it("Logout Link is in document", async () => {
      const { findByText, queryByText } = render(<Header isLoggedIn />);
      const logout = await findByText("Logout");
      expect(queryByText("Login")).not.toBeInTheDocument();
      expect(queryByText("Register")).not.toBeInTheDocument();
      expect(logout.getAttribute("href")).toEqual("/users/logout");
    });
  });

  describe("user is not logged in", () => {
    it("Login and Register Links is in document", async () => {
      const { findByText, queryByText } = render(<Header isLoggedIn={false} />);
      const login = await findByText("Login");
      const register = await findByText("Register");
      expect(login.getAttribute("href")).toEqual("/users/login");
      expect(register.getAttribute("href")).toEqual("/users/register");
      expect(queryByText("Logout")).not.toBeInTheDocument();
    });
  });
});
