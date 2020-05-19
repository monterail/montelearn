import Head from "next/head";
import { useRouter } from "next/router";

import LinkWithArrow from "@/components/LinkWithArrow";
import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Card from "@/components/Card";
import Label from "@/components/Label";
import SubTitle from "@/components/SubTitle";
import Text from "@/components/Text";
import auth from "@/containers/hoc/Auth";

import useRequest from "@/utils/hooks/useRequest";

import { BUTTON_DIRECTIONS } from "@/constants/buttonDirecitons";
import { LessonList } from "@/types/lesson";

function SubjectPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { data } = useRequest<LessonList>({
    url: `/lesson/`,
  });

  const handleBackClick = () => {
    router.push("/subjects");
  };

  const renderLessons = () =>
    data &&
    data.results.map((lesson, index) => {
      return (
        <Card key={`lesson-${lesson.name}-no-${index}`}>
          <Label className="text-sm">Lesson {index + 1}</Label>
          <SubTitle>{lesson.name}</SubTitle>
          <Text className="ml-text-truncate my-2">{lesson.description}</Text>
          <LinkWithArrow
            as={`/subjects/${lesson.subject}/lesson/${lesson.uuid}`}
            href="/subjects/[slug]/lesson/[id]"
            direction={BUTTON_DIRECTIONS.RIGHT}
            className="mt-8 hover:opacity-75 transition-opacity duration-200"
          >
            Dive right in!
          </LinkWithArrow>
        </Card>
      );
    });

  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app</title>
      </Head>
      <Breadcrumbs handleBackClick={handleBackClick} options={["Subjects", String(slug)]} />
      <div className="mx-3 sm:mx-0">
        <Title className="my-8">{slug} basics</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16">
          {renderLessons()}
        </div>
      </div>
    </section>
  );
}

export default auth(SubjectPage);
