import { useEffect } from "react";
import { useRouter } from "next/router";

import { logout } from "@/services/auth";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push("/");
  }, []);

  return null;
};

export default LogoutPage;
