import Head from "next/head";
import Link from "next/link";

import Title from "@/components/Title";
import Card from "@/components/Card";
import SubTitle from "@/components/SubTitle";
import Text from "@/components/Text";

export default function HomePage() {
  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app</title>
      </Head>
      <Card className="bg-red-100 relative grid grid-cols-3 hero-card">
        <div className="z-10 col-span-3 lg:col-span-2">
          <Title className="my-8 leading-none w-full sm:w-2/3">
            Build your own learning experience
          </Title>
          <Text className="font-roboto-mono my-8 w-full sm:w-2/3">
            We provide a rich API for developers who can build custom learning software for students
            on every education level
          </Text>
          <div className="inline-flex font-roboto-mono font-medium text-xl text-white bg-red-400 rounded-full">
            <Link href="/subjects">
              <a className="inline-flex px-10 py-5">Try it out</a>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 z-0">
          <img src="/images/hero.png" alt="Hero" />
        </div>
      </Card>
      <div className="flex flex-col lg:flex-row mt-12">
        <Card className="flex-1 flex flex-col">
          <SubTitle className="mb-4">Students</SubTitle>
          <Text className="flex-1">
            Exercitation Lorem exercitation excepteur anim velit nisi eu velit quis do elit. Officia
            sit ea adipisicing aliqua magna ad. Eiusmod pariatur aliquip ullamco consequat cupidatat
            excepteur ipsum sit fugiat irure sunt.
          </Text>
          <Link href="/users/login">
            <a className="inline-flex mt-4 font-medium border-2 rounded-full font-roboto-mono opacity-50 pointer-events-none px-8 py-3 cursor-not-allowed mr-auto">
              Try it out
            </a>
          </Link>
        </Card>
        <Card className="flex-1 flex flex-col">
          <SubTitle className="mb-4">Teachers</SubTitle>
          <Text className="flex-1">
            Cupidatat aliquip reprehenderit consectetur eiusmod sit qui incididunt cillum id minim
            aliquip in. Non eu commodo adipisicing nisi sit sit. Sunt reprehenderit culpa id aliqua
            est veniam eu eiusmod laboris amet ex. Quis elit amet nostrud ullamco officia proident
            cupidatat id ipsum ullamco.
          </Text>
          <Link href="/users/login">
            <a className="inline-flex mt-4 font-medium border-2 rounded-full font-roboto-mono opacity-50 pointer-events-none px-8 py-3 cursor-not-allowed mr-auto">
              Try it out
            </a>
          </Link>
        </Card>
        <Card className="flex-1 flex flex-col">
          <SubTitle className="mb-4">API Developers</SubTitle>
          <Text className="flex-1">
            Tempor aute irure consectetur reprehenderit ut enim officia consectetur. Pariatur
            proident aliquip nisi excepteur. Adipisicing magna tempor laborum incididunt
            reprehenderit.
          </Text>
          <Link href="/developers">
            <a className="inline-flex mt-4 font-medium border-2 rounded-full font-roboto-mono opacity-50 px-8 py-3 mr-auto">
              Try it out
            </a>
          </Link>
        </Card>
      </div>
    </section>
  );
}
