import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";

import Card from "@/components/Card";
import Title from "@/components/Title";
import InputWithLabel from "@/components/InputWithLabel";
import Button from "@/components/Button";

import { forgotPassword } from "@/services/auth";

import { ForgotPasswordErrorsType } from "@/utils/errors";

const initialErrors: ForgotPasswordErrorsType = {
  email: [],
};

export default function UsersForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(initialErrors);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await forgotPassword(email);
      const { detail } = response.data;
      setErrors(initialErrors);
      setSuccessMessage(detail);
    } catch (e) {
      setSuccessMessage("");
      setErrors({ ...initialErrors, ...e.response.data });
    }
  };

  return (
    <section className="px-4 md:px-6 mb-12 mx-auto w-full md:w-1/2">
      <Head>
        <title>montelearn / forgot password</title>
      </Head>
      <div className="my-12 md:my-18">
        <Title>Forgot password?</Title>
      </div>
      <div className="">
        <Card>
          <InputWithLabel
            id="email"
            name="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            placeholder="e.g. james.wilson@mail.com"
            type="email"
            errors={errors.email}
          />
          <div className="mb-6">{successMessage}</div>
          <Button className="px-8 py-4" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      </div>
      <div className="my-6">
        <Link href="/users/login">
          <a className="text-red-400 font-medium">Return to login</a>
        </Link>
      </div>
    </section>
  );
}
