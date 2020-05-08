import React, { useState } from "react";

import { register, RegisterInputs } from "@/services/auth";
import { rem } from "@project/core/lib/utils/theming";
import { COLOR_GEYSER } from "@project/core/lib/const/theming";

import StyledButton from "@/components/StyledButton/StyledButton";
import StyledInput from "@/components/StyledInput";

export default function Register() {
  const initialValues: RegisterInputs = {
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
  };

  const [inputs, setInputs] = useState(initialValues);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    return register(inputs).catch((err) => setError(err.message));
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
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
          <label htmlFor="password1">Password</label>
          <StyledInput
            type="password"
            id="password1"
            name="password1"
            onChange={handleInputChange}
            value={inputs.password1}
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password</label>
          <StyledInput
            type="password"
            id="password2"
            name="password2"
            onChange={handleInputChange}
            value={inputs.password2}
          />
        </div>
        <div>
          <label htmlFor="first_name">
            First name
            <StyledInput
              type="text"
              id="first_name"
              name="first_name"
              onChange={handleInputChange}
              value={inputs.first_name}
            />
          </label>
        </div>
        <div>
          <label htmlFor="last_name">Last name</label>
          <StyledInput
            type="text"
            id="last_name"
            name="last_name"
            onChange={handleInputChange}
            value={inputs.last_name}
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
