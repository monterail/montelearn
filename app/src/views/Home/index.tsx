import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app</title>
      </Head>
      <h1 className="text-title font-semibold font-eczar my-8 break-words">
        Here goes landing page?
      </h1>
      <Link href="/subjects">
        <a href="/subjects" className="flex items-center">
          Go to subjects
        </a>
      </Link>
    </section>
  );
}
