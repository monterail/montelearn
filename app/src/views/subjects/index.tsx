import Head from "next/head";
import Link from "next/link";

import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonWithArrow, { BUTTON_DIRECTIONS } from "@/components/ButtonWithArrow";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Label from "@/components/Label";
import SubjectIcon from "@/components/SubjectIcon";
import auth from "@/containers/hoc/Auth";

import SubjectIconsType from "@/types/subjectIcons";

const subjects = [
  { id: "biology", name: "biology", level: "basics", icon: "nature" },
  { id: "maths", name: "maths", level: "basics", icon: "atom" },
  { id: "physics", name: "physics", level: "atom" },
  { id: "chemistry", name: "chemistry", level: "basics", icon: "potion" },
  { id: "geography", name: "geography", level: "basics", icon: "weather" },
  { id: "history", name: "history", level: "basics", icon: "castle" },
  { id: "economics", name: "economics", level: "basics", icon: "babushka" },
  {
    id: "business studies",
    name: "business studies",
    level: "basics",
    icon: "potion",
  },
  { id: "art", name: "art", level: "basics", icon: "weather" },
  { id: "music", name: "music", level: "basics", icon: "castle" },
  {
    id: "computer science",
    name: "computer science",
    level: "basics",
    icon: "nature",
  },
];

const renderSubjects = () =>
  subjects.map((subject, index) => {
    const icon: SubjectIconsType = subject.icon as SubjectIconsType;
    return (
      <Card className="my-4" key={subject.id + index}>
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-sm">
              #{subject.level} #{subject.name}
            </Label>
            <h2 className="text-4xl my-1 font-semibold capitalize">{subject.name}</h2>
          </div>
          <SubjectIcon icon={icon} />
        </div>
        <p className="text-lg leading-relaxed tracking-wide lesson-text mb-4">
          Mollit quis cupidatat nisi nulla exercitation minim occaecat elit id culpa commodo Lorem
          proident esse. Minim nostrud do quis consectetur velit ad magna labore est occaecat
          consectetur officia deserunt. Amet non esse aliqua Lorem et ex consectetur incididunt
          consectetur. Incididunt sunt elit pariatur minim veniam quis exercitation laboris minim.
        </p>
        <Link href={`/subjects/${subject.id}`}>
          <a href={`/subjects/${subject.id}`}>
            <ButtonWithArrow
              direction={BUTTON_DIRECTIONS.RIGHT}
              className="mt-8 hover:opacity-75 transition-opacity duration-200"
            >
              Let's do it together!
            </ButtonWithArrow>
          </a>
        </Link>
      </Card>
    );
  });

function SubjectsPage() {
  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app</title>
      </Head>
      <Breadcrumbs back={false} options={["Subjects"]} />
      <div className="mx-3 sm:mx-0">
        <Title className="my-8">Subjects page</Title>
        <Text className="font-roboto-mono my-8 text-xl">
          Consequat ex enim aute labore in esse proident laborum cillum aliquip. Duis fugiat velit
          nulla sit ipsum duis ex aliquip nostrud pariatur non sit nostrud veniam. Laboris id ad
          anim duis.
        </Text>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">{renderSubjects()}</div>
      </div>
    </section>
  );
}

export default auth(SubjectsPage);
