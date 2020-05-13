import React, { ChangeEvent, FormEvent, useState } from "react";

import { register, RegisterInputs } from "@/services/auth";
import { rem } from "@project/core/lib/utils/theming";
import { COLOR_GEYSER } from "@project/core/lib/const/theming";

import StyledButton from "@/components/StyledButton/StyledButton";
import StyledInput from "@/components/StyledInput";

const initialValues: RegisterInputs = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

export default function Register() {
  const [inputs, setInputs] = useState(initialValues);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    return register(inputs).catch((err) => setError(err.message));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {error ? <p>{error}</p> : null}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <StyledInput
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={inputs.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <StyledInput
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <StyledInput
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleInputChange}
            value={inputs.confirmPassword}
          />
        </div>
        <div>
          <label htmlFor="firstName">
            First name
            <StyledInput
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleInputChange}
              value={inputs.firstName}
            />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <StyledInput
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleInputChange}
            value={inputs.lastName}
          />
        </div>
        <StyledButton
          css={{
            fontSize: rem(16),
            border: `${rem(2)} solid ${COLOR_GEYSER}`,
            padding: rem(10, 20),
          }}
          onClick={handleSubmit}
          type="sumbit"
        >
          Register
        </StyledButton>
      </form>
    </div>
  );
}
