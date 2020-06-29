import { FC, useState, ChangeEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Title from "@/components/Title";
import InputWithLabel from "@/components/InputWithLabel";

import { ChangePasswordInputs, resetPassword } from "@/services/auth";

import { ResetPasswordErrorsType } from "@/utils/errors";

type Props = {
  uid: string;
  token: string;
};

const initialValues: ChangePasswordInputs = {
  new_password1: "",
  new_password2: "",
};

const initialErrors: ResetPasswordErrorsType = {
  new_password1: [],
  new_password2: [],
};

const UsersResetPasswordPage: FC<Props> = ({ uid, token }) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await resetPassword({
        ...inputs,
        uid,
        token,
      });
      const { detail } = response.data;
      setErrors(initialErrors);
      setSuccessMessage(detail);
      setTimeout(() => {
        router.push("/users/login");
      }, 3000);
    } catch (e) {
      setSuccessMessage("");
      setErrors({ ...initialErrors, ...e.response.data });
    }
  };

  return (
    <section className="px-4 md:px-6 mb-12 mx-auto w-full md:w-1/2">
      <Head>
        <title>montelearn / reset password</title>
      </Head>
      <div className="my-12 md:my-18">
        <Title>Reset password</Title>
      </div>
      <div className="">
        <Card>
          <InputWithLabel
            id="password"
            name="new_password1"
            label="New password"
            type="password"
            placeholder="e.g. My$3creTP@ssVV0rD"
            onChange={handleInputChange}
            value={inputs.new_password1}
            errors={errors.new_password1}
          />
          <InputWithLabel
            id="confirm_password"
            name="new_password2"
            label="Confirm Password"
            type="password"
            placeholder="e.g. My$3creTP@ssVV0rD"
            onChange={handleInputChange}
            value={inputs.new_password2}
            errors={errors.new_password2}
          />
          <div className="mb-6">{successMessage}</div>
          <Button className="px-8 py-4" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default UsersResetPasswordPage;
