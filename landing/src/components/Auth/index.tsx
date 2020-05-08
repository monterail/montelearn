import Router from "next/router";
import Cookie from "js-cookie";

export default function auth(WrappedComponent: any) {
  return ({ redirect = true, ...props }: { redirect?: Boolean; props?: any }) => {
    const token = Cookie.get("access_token");
    if (!token && redirect) Router.push("/login");

    return <WrappedComponent token={token} {...props} />;
  };
}
