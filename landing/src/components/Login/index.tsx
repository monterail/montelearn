import { COLOR_GEYSER } from "@project/core/lib/const/theming";
import React, { useState } from "react";
import login from "@/services/login";

import Button from "@/components/Button";

export type LoginInputs = {
  email: string
  password: string
}

export default function Login () {
  // these values are hardcoded since our main.go api only accepts this auth combo
  const initialValues: LoginInputs = { email: "", password: "", };

  const [inputs, setInputs] = useState(initialValues);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
		e.preventDefault();
		return login(inputs)
			.catch((error) => setError(error.message));
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
		<div css={{ backgroundColor: COLOR_GEYSER }}>
			{error ? <p>{error}</p> : null}

			<form className="container mx-auto max-w-sm" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" onChange={handleInputChange} value={inputs.email}/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" name="password" onChange={handleInputChange} value={inputs.password}/>
				</div>
				<Button onClick={handleSubmit} type="sumbit">Login</Button>
			</form>
		</div>
	);
}
