import { useEffect } from "react";
import Router from "next/router";

import { isAuthenticated } from "@/utils/helpers/auth";

export default function auth(WrappedComponent: any) {
  return ({ redirect = true, ...props }: { redirect?: Boolean; props?: any }) => {
    const isLoggedIn = isAuthenticated();

    useEffect(() => {
      if (!isLoggedIn && redirect) Router.push("/users/login");
    }, []);

    return isLoggedIn && <WrappedComponent {...props} />;
  };
}
