import { useState, useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";

import { COOKIES } from "@/constants";

export default function auth(WrappedComponent: any) {
  return ({ redirect = true, ...props }: { redirect?: Boolean; props?: any }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const accessToken = Cookie.get(COOKIES.accessToken);

    useEffect(() => {
      if (!accessToken && redirect) Router.push("/users/login");
      else setIsLoggedIn(true);
    });

    return (
      <div>{isLoggedIn ? <WrappedComponent accessToken={accessToken} {...props} /> : <div />}</div>
    );
  };
}
