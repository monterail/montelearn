import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import Card from "@/components/Card";
import Text from "@/components/Text";
import Title from "@/components/Title";
import Button from "@/components/Button";
import InputWithLabel from "@/components/InputWithLabel";
import InputErrors from "@/components/InputErrors";
import { login, LoginInputsType } from "@/services/auth";
import { LoginErrorsType } from "@/utils/errors";

const initialInputs: LoginInputsType = { email: "", password: "" };
const initialErrors: LoginErrorsType = { email: [], password: [], non_field_errors: [] };

export default function UsersLoginPage() {
  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(initialErrors);

  const handleLogin = async () => {
    try {
      await login(inputs);
      Router.push("/");
    } catch (newErrors) {
      setErrors({ ...initialErrors, ...newErrors.data });
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
        <title>montelearn / login</title>
      </Head>
      <div className="my-12 md:my-18">
        <Title>Hi there!</Title>
        <Title className="text-gray-300">Care to log in?</Title>
      </div>
      <div className="">
        <Card>
          <InputWithLabel
            id="email"
            label="Email"
            placeholder="e.g. james.wilson@mail.com"
            type="email"
            onChange={handleInputChange}
            errors={errors.email}
          />
          <InputWithLabel
            id="password"
            label="Password"
            type="password"
            placeholder="e.g. My$3creTP@ssVV0rD"
            onChange={handleInputChange}
            errors={errors.password}
          />
          <InputErrors errorName="non_field_errors" errors={errors.non_field_errors} />
          <ul className="flex font-roboto-mono mt-10">
            <Button className="mx-0 sm:mx-2 px-8 py-4" onClick={handleLogin}>
              Login
            </Button>
            <li className="mx-0 sm:mx-2 font-medium text-red-400">
              <Link href="/users/register">
                <a href="/users/register" className="flex px-8 py-4">
                  Register
                </a>
              </Link>
            </li>
          </ul>
        </Card>
      </div>
      <div className="my-6">
        <Text>
          Did you forget your password?{" "}
          <Link href="/">
            <a href="/" className="text-red-400 font-medium">
              Reset it now
            </a>
          </Link>
        </Text>
      </div>
    </section>
  );
}
