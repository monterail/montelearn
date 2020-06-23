import Head from "next/head";

import Card from "@/components/Card";
import LinkWithArrow from "@/components/LinkWithArrow";
import Title from "@/components/Title";
import Label from "@/components/Label";
import SubjectIcon from "@/components/SubjectIcon";

import { BUTTON_DIRECTIONS } from "@/constants/buttonDirecitons";

import auth from "@/containers/hoc/Auth";

import { SUBJECT_ICONS, SubjectList } from "@/types/subject";

import useRequest from "@/utils/hooks/useRequest";
import { determineSubjectDescription } from "@/utils/helpers/determineSubjectDescription";

function SubjectsPage() {
  const { data } = useRequest<SubjectList>({
    url: "/subject",
  });

  const renderSubjects = () =>
    data?.results.map((subject, index) => {
      const icon: SUBJECT_ICONS = SUBJECT_ICONS.POTION;
      return (
        <Card className="my-4" key={`subject-${subject.uuid}-no${index}`}>
          <div className="flex items-start justify-between">
            <div>
              <Label className="text-sm">#basics #{subject.name}</Label>
              <h2 className="text-4xl my-1 font-semibold capitalize">{subject.name}</h2>
            </div>
            <SubjectIcon icon={icon} />
          </div>
          <p className="text-lg leading-relaxed tracking-wide lesson-text mb-4">
            {determineSubjectDescription(subject.name)}
          </p>
          <LinkWithArrow
            href="/subjects/[slug]"
            as={`/subjects/${subject.name}`}
            direction={BUTTON_DIRECTIONS.RIGHT}
            className="mt-8 hover:opacity-75 transition-opacity duration-200"
          >
            Let's do it together!
          </LinkWithArrow>
        </Card>
      );
    });

  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app</title>
      </Head>
      <div className="mx-3 sm:mx-0">
        <Title className="my-8">Subjects page</Title>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">{renderSubjects()}</div>
      </div>
    </section>
  );
}

export default auth(SubjectsPage);
