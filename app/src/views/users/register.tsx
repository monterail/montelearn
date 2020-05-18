import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import Card from "@/components/Card";
// import Text from "@/components/Text";
import Title from "@/components/Title";
import Button from "@/components/Button";
import InputWithLabel from "@/components/InputWithLabel";
import InputErrors from "@/components/InputErrors";
import { register, RegisterInputsType } from "@/services/auth";
import { RegisterErrorsType } from "@/utils/errors";

const initialValues: RegisterInputsType = {
  email: "",
  password1: "",
  password2: "",
  first_name: "",
  last_name: "",
};

const initialErrors: RegisterErrorsType = {
  email: [],
  password1: [],
  password2: [],
  first_name: [],
  last_name: [],
  non_field_errors: [],
};

export default function UsersRegisterPage() {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const handleLogin = async () => {
    try {
      await register(inputs);
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
        <title>montelearn / register</title>
      </Head>
      <div className="my-12 md:my-18">
        <Title>Ahoy you!</Title>
        <Title className="text-gray-300">Wanna register?</Title>
      </div>
      <div className="">
        <Card>
          <InputWithLabel
            id="first_name"
            label="First Name"
            placeholder="e.g. James"
            onChange={handleInputChange}
            errors={errors.first_name}
          />
          <InputWithLabel
            id="last_name"
            label="Last Name"
            placeholder="e.g. Wilson"
            onChange={handleInputChange}
            errors={errors.last_name}
          />
          <InputWithLabel
            id="email"
            label="Email"
            placeholder="e.g. james.wilson@mail.com"
            onChange={handleInputChange}
            errors={errors.email}
          />
          <InputWithLabel
            id="password1"
            label="Password"
            type="password"
            placeholder="e.g. My$3creTP@ssVV0rD"
            onChange={handleInputChange}
            errors={errors.password1}
          />
          <InputWithLabel
            id="password2"
            label="Confirm Password"
            type="password"
            placeholder="e.g. My$3creTP@ssVV0rD"
            onChange={handleInputChange}
            errors={errors.password2}
          />
          <InputErrors errorName="non_field_errors" errors={errors.non_field_errors} />
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
