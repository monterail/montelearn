import { useEffect } from "react";
import Router from "next/router";

import { logout } from "@/services/auth";

const LogoutPage = () => {
  useEffect(() => {
    logout();
    Router.push("/");
  }, []);

  return null;
};

export default LogoutPage;
