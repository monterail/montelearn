import Head from "next/head";
import Link from "next/link";

import Card from "@/components/Card";
// import Text from "@/components/Text";
import Title from "@/components/Title";
import InputWithLabel from "@/components/InputWithLabel";

export default function UsersRegisterPage() {
  return (
    <section className="px-4 md:px-6 mb-12 mx-auto w-full md:w-2/3">
      <Head>
        <title>montelearn / register</title>
      </Head>
      <div className="my-12 md:my-18">
        <Title>Ahoy you!</Title>
        <Title className="text-gray-300">Wanna register?</Title>
      </div>
      <div className="">
        <Card>
          <InputWithLabel id="first_name" label="First Name" placeholder="e.g. James" />
          <InputWithLabel id="last_name" label="Last Name" placeholder="e.g. Wilson" />
          <InputWithLabel id="email" label="Email" placeholder="e.g. james.wilson@mail.com" />
          <InputWithLabel
            id="password"
            label="Password"
            type="password"
            placeholder="************"
          />
          <InputWithLabel
            id="confirm_password"
            label="Confirm Password"
            type="password"
            placeholder="************"
          />
          <ul className="flex font-roboto-mono mt-10">
            <li className="font-medium text-white bg-red-400 rounded-full">
              <Link href="/users/register">
                <a href="/users/register" className="flex px-8 py-4">
                  Register now
                </a>
              </Link>
            </li>
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
