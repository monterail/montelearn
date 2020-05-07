import Head from "next/head";
import { useRouter } from "next/router";

import { ButtonWithArrow } from "@/components/ButtonWithArrow";
import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Card from "@/components/Card";

export default function SubjectsPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app</title>
      </Head>
      <Breadcrumbs options={["Subjects", String(slug)]} />
      <Title className="my-8">Chemistry basics</Title>
      <h2 className="text-xl font-roboto-mono my-8">
        Goddamit, chemistry is importane. Very very importane.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16">
        <Card>
          <strong className="text-red-300 text-sm">Lesson 1</strong>
          <h2 className="text-4xl my-1 font-semibold">What are pictograms?</h2>
          <p className="text-lg leading-relaxed tracking-wide lesson-text">
            In ea ea mollit commodo esse dolore fugiat laborum dolore ex irure nostrud minim cillum.
            Pariatur anim veniam ipsum esse consectetur nisi aliqua eu Lorem sit dolor sunt commodo.
            Anim quis eiusmod reprehenderit culpa qui amet. Nulla voluptate quis ad sint laboris
            veniam et duis laborum.
          </p>
          <ButtonWithArrow direction="right" className="mt-8" onClick={() => window.alert("siema")}>
            Let's do it together!
          </ButtonWithArrow>
        </Card>
        <Card>
          <strong className="text-red-300 text-sm">Lesson 2</strong>
          <h2 className="text-4xl my-1 font-semibold">Structure of an Atom</h2>
          <p className="text-lg leading-relaxed tracking-wide lesson-text">
            Commodo reprehenderit eiusmod consectetur ad commodo occaecat officia. Eiusmod non
            proident dolore id quis esse dolor culpa minim dolor ut minim cillum sint. Incididunt
            amet cupidatat ex quis sunt. Laborum fugiat velit veniam ullamco dolore veniam nisi duis
            culpa amet labore quis. Cillum aliqua ipsum nulla id qui tempor quis sunt. Ipsum et do
            nulla dolor dolore eu voluptate exercitation esse nisi ullamco.
          </p>
          <ButtonWithArrow direction="right" className="mt-8">
            Let's do it together!
          </ButtonWithArrow>
        </Card>
        <Card>
          <strong className="text-red-300 text-sm">Lesson 3</strong>
          <h2 className="text-4xl my-1 font-semibold">What is cocaine</h2>
          <p className="text-lg leading-relaxed tracking-wide lesson-text">
            Velit in dolore in aliqua amet ea do sunt culpa. Proident deserunt laboris non labore.
            Voluptate ut ad aliqua nulla amet cupidatat cupidatat duis reprehenderit. Aliqua
            exercitation aliqua do Lorem esse minim deserunt ad elit deserunt anim consequat
            exercitation. Consectetur duis velit fugiat magna. Reprehenderit ipsum ea labore fugiat
            deserunt eu nisi. Velit irure duis esse commodo non laboris ex eu reprehenderit officia
            amet cupidatat.
          </p>
          <ButtonWithArrow direction="right" className="mt-8">
            Let's do it together!
          </ButtonWithArrow>
        </Card>
      </div>
    </section>
  );
}
