import Cookie from "js-cookie";
import { AxiosResponse } from "axios";

import { COOKIES } from "@/constants";
import { InputError } from "@/utils/errors";

import apiClient from "./apiClient";

export type LoginInputsType = {
  email: string;
  password: string;
};

export type RegisterInputsType = {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
};

type Cookies = {
  access_token: string;
  refresh_token: string;
};

export type ChangePasswordInputs = {
  new_password1: string;
  new_password2: string;
};

export type ConfirmResetPasswordData = ChangePasswordInputs & {
  uid: string;
  token: string;
};

function setCookies({ access_token, refresh_token }: Cookies) {
  Cookie.set(COOKIES.accessToken, access_token);
  Cookie.set(COOKIES.refreshToken, refresh_token);
}

async function authenticate({ body, url }: { body: string; url: string }) {
  try {
    const response = await apiClient.post(url, body);
    setCookies(response.data);
  } catch (error) {
    if (error.response && Object.values(error.response.data).every((e: any) => Array.isArray(e))) {
      throw new InputError(error.message, error.response.data);
    }
    throw new InputError(error.message, {
      non_field_errors: ["An unexpected error has occurred"],
    });
  }
}

export function login(inputs: LoginInputsType): Promise<string | void> {
  const body = JSON.stringify(inputs);
  const url = `/auth/email/login/`;
  return authenticate({ body, url });
}

export function register(inputs: RegisterInputsType): Promise<string | void> {
  const body = JSON.stringify(inputs);
  const url = `/auth/email/register/`;
  return authenticate({ body, url });
}

export function forgotPassword(email: string): Promise<AxiosResponse<{ detail: string }>> {
  const url = `/auth/email/password/reset/`;
  return apiClient.post(url, {
    email,
  });
}

export function resetPassword(
  data: ConfirmResetPasswordData,
): Promise<AxiosResponse<{ detail: string }>> {
  const url = `/auth/email/password/reset/confirm/`;
  return apiClient.post(url, data);
}

export function logout() {
  Cookie.remove(COOKIES.accessToken);
  Cookie.remove(COOKIES.refreshToken);
}
