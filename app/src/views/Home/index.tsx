import Head from "next/head";
import Link from "next/link";
import Title from "@/components/Title";
import apiClient from "@/services/api-client/apiClient";

const fetchTest = async () => {
  try {
    const response = await apiClient.get("/employees");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export default function HomePage() {
  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app</title>
      </Head>
      <Title className="my-8">Here goes landing page?</Title>
      <Link href="/subjects">
        <a href="/subjects" className="flex items-center">
          Go to subjects
        </a>
      </Link>
      <button type="button" onClick={() => fetchTest()}>
        Fetch
      </button>
    </section>
  );
}
