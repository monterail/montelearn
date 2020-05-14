import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import Card from "@/components/Card";
// import Text from "@/components/Text";
import Title from "@/components/Title";
import Button from "@/components/Button";
import InputWithLabel from "@/components/InputWithLabel";
import { register, RegisterInputs } from "@/services/auth";

export default function UsersRegisterPage() {
  const initialValues: RegisterInputs = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  };

  const [inputs, setInputs] = useState(initialValues);
  // const [error, setError] = useState(""); // TBD in ME-106

  const handleLogin = async () => {
    try {
      await register(inputs);
      Router.push("/");
    } catch (err) {
      // setError(err.message) // TBD in ME-106
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section className="px-4 md:px-6 mb-12 mx-auto w-full md:w-1/2">
      <Head>
        <title>montelearn / register</title>
      </Head>
      <div className="my-12 md:my-18">
        <Title>Ahoy you!</Title>
        <Title className="text-gray-300">Wanna register?</Title>
      </div>
      <div className="">
        <Card>
          <InputWithLabel
            id="firstName"
            label="First Name"
            placeholder="e.g. James"
            onChange={handleInputChange}
          />
          <InputWithLabel
            id="last_Name"
            label="Last Name"
            placeholder="e.g. Wilson"
            onChange={handleInputChange}
          />
          <InputWithLabel
            id="email"
            label="Email"
            placeholder="e.g. james.wilson@mail.com"
            onChange={handleInputChange}
          />
          <InputWithLabel
            id="password"
            label="Password"
            type="password"
            placeholder="e.g. My$3creTP@ssVV0rD"
            onChange={handleInputChange}
          />
          <InputWithLabel
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="e.g. My$3creTP@ssVV0rD"
            onChange={handleInputChange}
          />
          <ul className="flex font-roboto-mono mt-10">
            <Button className="px-8 py-4" onClick={handleLogin}>
              Register now
            </Button>
            <li className="font-medium text-red-400">
              <Link href="/users/login">
                <a href="/users/login" className="flex px-8 py-4">
                  Login
                </a>
              </Link>
            </li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
