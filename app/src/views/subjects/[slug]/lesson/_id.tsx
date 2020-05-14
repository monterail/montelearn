import Head from "next/head";
import { useRouter } from "next/router";

import ButtonWithArrow from "@/components/ButtonWithArrow";
import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Card from "@/components/Card";
import Label from "@/components/Label";
import Button from "@/components/Button";
import RadioButton from "@/components/RadioButton";
import QuesitonLabel from "@/components/QuestionLabel";

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

function LessonPage() {
  const router = useRouter();
  const { id, slug } = router.query;

  const handleBackClick = () => {
    router.push(`/subjects/${slug}`);
  };

  const renderSections = () =>
    sections.map((section) => {
      return (
        <Card className="w-full md:w-1/2 mb-8">
          <Label className="text-sm">Section {section.id}</Label>
          <h2 className="text-4xl my-1 font-semibold">{section.title}</h2>
          <ButtonWithArrow direction="right" className="mt-8">
            Let's do it together!
          </ButtonWithArrow>
        </Card>
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
        <div className="my-8">
          <Label className="text-xl">Lesson {id}</Label>
          <Title>What are pictograms?</Title>
        </div>
        <Button className="mr-auto sm:mr-0">Open lesson</Button>
      </div>
      <Text className="text-xl font-roboto-mono my-8">
        The Hazard Communication Standard (HCS) requires pictograms on labels to alert users of the
        chemical hazards to which they may be exposed. In this lesson, you will learn more about
        chemistry pictograms.
      </Text>
      <hr className="my-12 block border border-gray-200 h-0 opacity-50" />
      <div className="flex flex-col items-center content-center">{renderSections()}</div>
      <div className="flex flex-col items-center w-full bg-red-100 py-20 mt-10">
        <h2 className="font-eczar text-4xl font-semibold mb-8">Time to yest your konewledge</h2>
        <div className="p-10 bg-white rounded-lg w-1/2 mb-8">
          <Label className="text-sm">Question 1</Label>
          <h2 className="text-2xl my-1 font-semibold">
            Important information on the identity and hazards of a chemical material can be found on
            the container label:
          </h2>
          <div className="mt-6 flex w-full items-center justify-around">
            <RadioButton>True</RadioButton>
            <RadioButton>False</RadioButton>
            <QuesitonLabel isCorrect>Correct</QuesitonLabel>
          </div>
        </div>
        <div className="p-10 bg-white rounded-lg w-1/2 mb-8">
          <Label className="text-sm">Question 2</Label>
          <h2 className="text-2xl my-1 font-semibold">
            Important information on the identity and hazards of a chemical material can be found on
            the container label:
          </h2>
          <div className="mt-6 flex w-full items-center justify-around">
            <RadioButton>True</RadioButton>
            <RadioButton>False</RadioButton>
            <QuesitonLabel isCorrect={false}>Wrong</QuesitonLabel>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LessonPage;
