import Cookie from "js-cookie";
import { COOKIES } from "@/constants";

export type LoginInputs = {
  email: string;
  password: string;
};

export type RegisterInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

type Cookies = {
  access_token: string;
  refresh_token: string;
};

function setCookies({ access_token, refresh_token }: Cookies): void {
  Cookie.set(COOKIES.accessToken, access_token);
  Cookie.set(COOKIES.refreshToken, refresh_token);
}

async function authenticate({ body, url }: { body: string; url: string }) {
  const requestParams = {
    method: "POST",
    body,
    headers: new Headers({ "Content-Type": "application/json" }),
  };

  const response = await fetch(url, requestParams);
  if (response.status < 200 || response.status >= 300) {
    throw new Error("Please provide correct email and password");
  }

  const responseData = await response.json();
  setCookies(responseData);
}

export async function login(inputs: LoginInputs): Promise<string | void> {
  const body = JSON.stringify(inputs);
  const url = `${process.env.API_URL}/api/auth/email/login/`;
  return authenticate({ body, url });
}

export async function register({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
}: RegisterInputs): Promise<string | void> {
  const rawBody = {
    email,
    password1: password,
    password2: confirmPassword,
    first_name: firstName,
    last_name: lastName,
  };
  const body = JSON.stringify(rawBody);
  const url = `${process.env.API_PLAYGROUND_URL}/api/auth/email/register/`;
  return authenticate({ body, url });
}

export async function logout() {
  Cookie.remove(COOKIES.accessToken);
  Cookie.remove(COOKIES.refreshToken);
}
