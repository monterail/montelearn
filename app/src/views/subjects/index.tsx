import Head from "next/head";
import Link from "next/link";

import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";

const subjects = [
  { id: "biology", name: "biology" },
  { id: "maths", name: "maths" },
  { id: "physics", name: "physics" },
  { id: "chemistry", name: "chemistry" },
  { id: "geography", name: "geography" },
  { id: "history", name: "history" },
  { id: "economics", name: "economics" },
  { id: "business studies", name: "business studies" },
  { id: "art", name: "art" },
  { id: "music", name: "music" },
  { id: "computer science", name: "computer science" },
];

export default function SubjectsPage() {
  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app</title>
      </Head>
      <Breadcrumbs back={false} options={["Subjects"]} />
      <Title className="my-8">Subjects page</Title>
      <h2 className="text-xl font-roboto-mono my-8">
        Consequat ex enim aute labore in esse proident laborum cillum aliquip. Duis fugiat velit
        nulla sit ipsum duis ex aliquip nostrud pariatur non sit nostrud veniam. Laboris id ad anim
        duis.
      </h2>
      {subjects.map((el, index) => {
        return (
          <Link key={el.id} href={`/subjects/${el.id}`}>
            <a href={`/subjects/${el.id}`}>
              <Card className="my-4 hover:opacity-75 transition-opacity duration-200" key={index}>
                <h2 className="text-4xl my-1 font-semibold capitalize">{el.name}</h2>
                <p className="text-lg leading-relaxed tracking-wide lesson-text mb-4">
                  Mollit quis cupidatat nisi nulla exercitation minim occaecat elit id culpa commodo
                  Lorem proident esse. Minim nostrud do quis consectetur velit ad magna labore est
                  occaecat consectetur officia deserunt. Amet non esse aliqua Lorem et ex
                  consectetur incididunt consectetur. Incididunt sunt elit pariatur minim veniam
                  quis exercitation laboris minim.
                </p>
              </Card>
            </a>
          </Link>
        );
      })}
    </section>
  );
}
