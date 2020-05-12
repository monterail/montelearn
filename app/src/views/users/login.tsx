import Head from "next/head";
import Title from "@/components/Title";

export default function UsersLoginPage() {
  return (
    <section className="px-2 mb-12">
      <Head>
        <title>montelearn / login</title>
      </Head>
      <Title className="my-8">Login page</Title>
    </section>
  );
}
