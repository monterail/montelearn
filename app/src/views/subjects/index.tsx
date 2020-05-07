import Head from "next/head";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function SubjectsPage() {
  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app</title>
      </Head>
      <Breadcrumbs options={["Subjects"]} />
      <h1 className="text-title font-semibold font-eczar my-8 break-words">Subjects page</h1>
      <h2 className="text-xl font-roboto-mono my-8">
        It's a subject's list page. Nisi minim mollit duis fugiat nisi amet laboris nulla ea
        deserunt esse. Consequat ex enim aute labore in esse proident laborum cillum aliquip. Duis
        fugiat velit nulla sit ipsum duis ex aliquip nostrud pariatur non sit nostrud veniam.
        Laboris id ad anim duis.
      </h2>
      <Link href="/subjects/chemistry">
        <a href="/subjects/chemistry" className="flex items-center">
          Go to chemistry
        </a>
      </Link>
    </section>
  );
}
