import React, { useState, ChangeEvent, FormEvent } from "react";

import { login, LoginInputs } from "@/services/auth";
import { rem } from "@project/core/lib/utils/theming";
import { COLOR_GEYSER } from "@project/core/lib/const/theming";

import StyledButton from "@/components/StyledButton/StyledButton";
import StyledInput from "@/components/StyledInput";

export default function Login() {
  const initialValues: LoginInputs = { email: "", password: "" };

  const [inputs, setInputs] = useState(initialValues);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    login(inputs).catch((err) => setError(err.message));
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
        <StyledButton
          css={{
            fontSize: rem(16),
            border: `${rem(2)} solid ${COLOR_GEYSER}`,
            padding: rem(10, 20),
          }}
          onClick={handleSubmit}
          type="sumbit"
        >
          Login
        </StyledButton>
      </form>
    </div>
  );
}
