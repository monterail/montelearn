import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Card from "@/components/Card";
import Text from "@/components/Text";
import Title from "@/components/Title";
import Button from "@/components/Button";
import InputWithLabel from "@/components/InputWithLabel";
import InputErrors from "@/components/InputErrors";

import { login, LoginInputsType } from "@/services/auth";

import { LoginErrorsType } from "@/utils/errors";

const initialInputs: LoginInputsType = { email: "", password: "" };
const initialErrors: LoginErrorsType = {
  email: [],
  password: [],
  non_field_errors: [],
};

export default function UsersLoginPage() {
  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(initialErrors);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(inputs);
      router.push("/");
    } catch (newErrors) {
      setErrors({ ...initialErrors, ...newErrors.data });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="w-full px-4 mx-auto mb-12 md:px-6 md:w-1/2">
      <Head>
        <title>montelearn / login</title>
      </Head>
      <div className="my-12 md:my-18">
        <Title>
          Hi there!
          <br />
          <span className="text-gray-300">Care to log in?</span>
        </Title>
      </div>
      <div className="">
        <Card>
          <InputWithLabel
            id="email"
            name="email"
            label="Email"
            placeholder="e.g. james.wilson@mail.com"
            type="email"
            value={inputs.email}
            onChange={handleInputChange}
            errors={errors.email}
          />
          <InputWithLabel
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="e.g. My$3creTP@ssVV0rD"
            value={inputs.password}
            onChange={handleInputChange}
            errors={errors.password}
          />
          <InputErrors errors={errors.non_field_errors} />
          <ul className="flex mt-10 font-roboto-mono">
            <Button className="px-8 py-4 mx-0 sm:mx-2" onClick={handleLogin}>
              Login
            </Button>
            <li className="mx-0 font-medium text-red-400 sm:mx-2">
              <Link href="/users/register">
                <a className="flex px-8 py-4">Register</a>
              </Link>
            </li>
          </ul>
        </Card>
      </div>
      <div className="my-6">
        <Text>
          Did you forget your password?{" "}
          <Link href="/users/forgot-password">
            <a className="font-medium text-red-400">Reset it now</a>
          </Link>
        </Text>
      </div>
    </section>
  );
}
