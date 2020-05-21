import { useEffect } from "react";
import { useRouter } from "next/router";

import { setApiClientAuthToken } from "@/services/apiClient";

import { logout } from "@/utils/helpers/auth";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    logout();
    setApiClientAuthToken("");
    router.push("/");
  }, []);

  return null;
};

export default LogoutPage;
