import Head from "next/head";
import { useRouter } from "next/router";

function LessonPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app - Lesson {id}</title>
      </Head>
      <h1 className="text-title font-semibold font-eczar my-8 break-words">
        My Lesson: <span className="text-red-monterail">{id}</span>
      </h1>
    </section>
  );
}

export default LessonPage;
