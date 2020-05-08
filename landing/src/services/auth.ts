import Cookie from "js-cookie";
import Router from "next/router";
import { COOKIES } from "@/constants";

export type LoginInputs = {
  email: string;
  password: string;
};

export type RegisterInputs = {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
};

function setCookies({ token, user }: { token: string; user: any }): void {
  Cookie.set(COOKIES.accessToken, token);
  for (const cookie of Object.values(COOKIES)) {
    if (user[cookie]) {
      Cookie.set(cookie, user[cookie]);
    }
  }
}

function authenticate({ body, url }: { body: string; url: string }) {
  const request = new Request(url, {
    method: "POST",
    body,
    headers: new Headers({ "Content-Type": "application/json" }),
  });

  return fetch(request)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Please provide correct email and password");
      }
      return response.json();
    })
    .then(async (res) => {
      setCookies(res);
      await Router.push("/");
    });
}

export async function login(inputs: LoginInputs): Promise<string | void> {
  const body = JSON.stringify(inputs);
  const url = `${process.env.API_PLAYGROUND_URL}/api/auth/email/login/`;
  return authenticate({ body, url });
}

export async function register(inputs: RegisterInputs): Promise<string | void> {
  const body = JSON.stringify(inputs);
  const url = `${process.env.API_PLAYGROUND_URL}/api/auth/email/register/`;
  return authenticate({ body, url });
}

export async function logout() {
  for (const cookie of Object.values(COOKIES)) {
    Cookie.remove(cookie);
  }
  await Router.push("/");
}
