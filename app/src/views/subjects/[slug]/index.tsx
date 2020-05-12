import Head from "next/head";
import { useRouter } from "next/router";

import { ButtonWithArrow } from "@/components/ButtonWithArrow";
import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Card from "@/components/Card";
import Label from "@/components/Label";
import SubTitle from "@/components/SubTitle";

const lessons = [
  {
    slug: "1",
    title: "What are pictograms?",
    description:
      "In ea ea mollit commodo esse dolore fugiat laborum dolore ex irure nostrud minim cillum. Pariatur anim veniam ipsum esse consectetur nisi aliqua eu Lorem sit dolor sunt commodo. Anim quis eiusmod reprehenderit culpa qui amet. Nulla voluptate quis ad sint laboris veniam et duis laborum.",
  },
  {
    slug: "2",
    title: "Structure of an Atom",
    description:
      "Commodo reprehenderit eiusmod consectetur ad commodo occaecat officia. Eiusmod non proident dolore id quis esse dolor culpa minimdolor ut minim cillum sint. Incididunt amet cupidatat ex quis sunt. Laborum fugiat velit veniam ullamco dolore veniam nisi duis culpa amet labore quis. Cillum aliqua ipsum nulla id qui tempor quis sunt. Ipsum et do nulla dolor dolore eu voluptate exercitation esse nisi ullamco.",
  },
  {
    slug: "3",
    title:
      "Aute qui nisi irure tempor sint magna sit et nostrud ad. Laborum eiusmod duis deserunt sit.",
    description:
      "Deserunt amet culpa deserunt proident magna ut et incididunt minim. Cillum in nulla sit laborum in officia exercitation aute do occaecat pariatur. Veniam consectetur culpa sunt ipsum quis nostrud. Cillum consequat incididunt aliqua commodo mollit irure dolor voluptate amet. Ad nostrud nulla aliqua deserunt consectetur. Do do cillum sint officia quis fugiat mollit eiusmod excepteur amet est. Do ullamco voluptate velit cupidatat duis ullamco mollit aliquip officia adipisicing ex ullamco laboris.",
  },
];

export default function SubjectPage() {
  const router = useRouter();
  const { slug } = router.query;

  const handleBackClick = () => {
    router.push("/subjects");
  };

  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app</title>
      </Head>
      <Breadcrumbs handleBackClick={handleBackClick} options={["Subjects", String(slug)]} />
      <Title className="my-8">{slug} basics</Title>
      <h2 className="text-xl font-roboto-mono my-8">
        Goddamit, {slug} is importane. Very very importane.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16">
        {lessons.map((lesson, index) => {
          return (
            <Card key={lesson.slug}>
              <Label className="text-sm">Lesson {index + 1}</Label>
              <SubTitle>{lesson.title}</SubTitle>
              <p className="text-lg leading-relaxed tracking-wide ml-text-truncate">
                {lesson.description}
              </p>
              <ButtonWithArrow
                direction="right"
                className="mt-8"
                onClick={() => router.push(`/subjects/${slug}/lesson/${lesson.slug}`)}
              >
                Let's do it together!
              </ButtonWithArrow>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
