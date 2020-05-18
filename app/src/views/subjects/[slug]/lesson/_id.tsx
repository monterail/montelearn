import Head from "next/head";
import { useRouter } from "next/router";

import ButtonWithArrow, { BUTTON_DIRECTIONS } from "@/components/ButtonWithArrow";
import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Card from "@/components/Card";
import Label from "@/components/Label";
import Button from "@/components/Button";
import RadioButton from "@/components/RadioButton";
import QuesitonLabel from "@/components/QuestionLabel";
import auth from "@/containers/hoc/Auth";

const sections = [
  {
    id: "1",
    title: `Intro`,
  },
  {
    id: "2",
    title: "Exploding bomb",
  },
  {
    id: "3",
    title: "Environment",
  },
];

const questions = [
  {
    id: "1",
    title:
      "Important information on the identity and hazards of a chemical material can be found on the container label",
    correct: true,
  },
  {
    id: "2",
    title:
      "Important information on the identity and hazards of a chemical material can be found on the container label",
    correct: false,
  },
  {
    id: "3",
    title:
      "Important information on the identity and hazards of a chemical material can be found on the container label",
    correct: true,
  },
];

function LessonPage() {
  const router = useRouter();
  const { id, slug } = router.query;

  const handleBackClick = () => {
    router.push(`/subjects/${slug}`);
  };

  const renderSections = () =>
    sections.map((section) => {
      return (
        <Card className="w-full md:w-1/2 mb-8" key={`section-${section.title}-no-${section.id}`}>
          <Label className="text-sm">Section {section.id}</Label>
          <h2 className="text-4xl my-1 font-semibold">{section.title}</h2>
          <ButtonWithArrow direction={BUTTON_DIRECTIONS.RIGHT} className="mt-8">
            Check this out!
          </ButtonWithArrow>
        </Card>
      );
    });

  const renderQuestions = () =>
    questions.map((question) => {
      return (
        <div
          className="p-6 sm:p-10 bg-white rounded-lg w-4/5 lg:w-3/4 xl:w-1/2 mb-8"
          key={`question-${question.title}-no-${question.id}`}
        >
          <Label className="text-sm">Question {question.id}</Label>
          <Text className="my-1 md:text-xl xl:text-2xl font-semibold">{question.title}</Text>
          <div className="mt-6 flex flex-wrap w-full items-center justify-around">
            <div className="flex flex-col sm:flex-row mb-4 md:mb-0">
              <RadioButton className="mx-3 mb-4 sm:mb-0">True</RadioButton>
              <RadioButton className="mx-3">False</RadioButton>
            </div>
            <QuesitonLabel className="lg:mt-3 xl:mt-0" isCorrect={question.correct} />
          </div>
        </div>
      );
    });

  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app - Lesson {id}</title>
      </Head>
      <Breadcrumbs
        handleBackClick={handleBackClick}
        options={["Subjects", String(slug), `Lesson ${String(id)}`]}
      />
      <div className="mx-3 sm:mx-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
          <div className="my-8">
            <Label className="text-xl">Lesson {id}</Label>
            <Title>What are pictograms?</Title>
          </div>
          <Button className="mr-auto sm:mr-0">Open lesson</Button>
        </div>
        <Text className="text-xl font-roboto-mono my-8">
          The Hazard Communication Standard (HCS) requires pictograms on labels to alert users of
          the chemical hazards to which they may be exposed. In this lesson, you will learn more
          about chemistry pictograms.
        </Text>
        <hr className="my-12 block border border-gray-200 h-0 opacity-50" />
        <div className="flex flex-col items-center content-center">{renderSections()}</div>
        <div className="flex flex-col items-center w-full bg-red-100 py-20 mt-10">
          <h2 className="font-eczar text-center text-4xl font-semibold mb-8">
            Time to yest your konewledge
          </h2>
          {renderQuestions()}
        </div>
      </div>
    </section>
  );
}

export default auth(LessonPage);
