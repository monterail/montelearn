import Head from "next/head";
import Link from "next/link";

import Card from "@/components/Card";
import Text from "@/components/Text";
import Title from "@/components/Title";
import InputWithLabel from "@/components/InputWithLabel";

export default function UsersLoginPage() {
  return (
    <section className="px-4 md:px-6 mb-12 mx-auto w-full md:w-2/3">
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
          />
          <InputWithLabel
            id="password"
            label="Password"
            type="password"
            placeholder="e.g. Mys3creTP@ssVV0rD"
          />
          <ul className="flex font-roboto-mono mt-10">
            <li className="mx-0 sm:mx-2 font-medium text-white bg-red-400 rounded-full">
              <Link href="/users/login">
                <a href="/users/login" className="flex px-8 py-4">
                  Login
                </a>
              </Link>
            </li>
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
