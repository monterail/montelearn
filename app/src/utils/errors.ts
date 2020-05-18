export type LoginErrorsType = {
  email?: string[];
  password?: string[];
  non_field_errors?: string[];
};

export type RegisterErrorsType = {
  email?: string[];
  password1?: string[];
  password2?: string[];
  first_name?: string[];
  last_name?: string[];
  non_field_errors?: string[];
};

export class InputError extends Error {
  data: LoginErrorsType | RegisterErrorsType;

  constructor(message: string, data: LoginErrorsType | RegisterErrorsType) {
    super(message);
    this.data = data;
  }
}
