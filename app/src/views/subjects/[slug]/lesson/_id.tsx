import Head from "next/head";
import { useRouter } from "next/router";

import { ButtonWithArrow } from "@/components/ButtonWithArrow";
import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Card from "@/components/Card";
import Label from "@/components/Label";
import Button from "@/components/Button";

function LessonPage() {
  const router = useRouter();
  const { id, slug } = router.query;

  const handleBackClick = () => {
    router.push(`/subjects/${slug}`);
  };

  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app - Lesson {id}</title>
      </Head>
      <Breadcrumbs
        handleBackClick={handleBackClick}
        options={["Subjects", String(slug), `Lesson ${String(id)}`]}
      />
      <div className="flex items-center justify-between w-full">
        <div className="my-8">
          <Label className="text-xl">Lesson {id}</Label>
          <Title>What are pictograms?</Title>
        </div>
        <Button onClick={() => window.alert("siema")}>Open lesson</Button>
      </div>
      <h2 className="text-xl font-roboto-mono mb-8 max-w-screen-sm">
        The Hazard Communication Standard (HCS) requires pictograms on labels to alert users of the
        chemical hazards to which they may be exposed. In this lesson, you will learn more about
        chemistry pictograms.
      </h2>
      <hr className="my-12 block border border-gray-200 h-0 opacity-50" />
      <div className="flex flex-col items-center content-center">
        <Card className="w-1/2 mb-8">
          <Label className="text-sm">Section 1</Label>
          <h2 className="text-4xl my-1 font-semibold">Intro</h2>
          <ButtonWithArrow direction="right" className="mt-8">
            Let's do it together!
          </ButtonWithArrow>
        </Card>
        <Card className="w-1/2 mb-8">
          <Label className="text-sm">Section 2</Label>
          <h2 className="text-4xl my-1 font-semibold">Exploding bomb</h2>
          <ButtonWithArrow direction="right" className="mt-8">
            Let's do it together!
          </ButtonWithArrow>
        </Card>
        <Card className="w-1/2 mb-8">
          <Label className="text-sm">Section 3</Label>
          <h2 className="text-4xl my-1 font-semibold">Environment</h2>
          <ButtonWithArrow direction="right" className="mt-8">
            Let's do it together!
          </ButtonWithArrow>
        </Card>
      </div>
      <div className="flex flex-col items-center w-full bg-red-100 py-20 mt-10">
        <h2 className="font-eczar text-4xl font-semibold mb-8">Time to yest your konewledge</h2>
        <div className="p-10 bg-white rounded-lg w-1/2 mb-8">
          <Label className="text-sm">Question 1</Label>
          <h2 className="text-2xl my-1 font-semibold">
            Important information on the identity and hazards of a chemical material can be found on
            the container label:
          </h2>
        </div>
      </div>
    </section>
  );
}

export default LessonPage;
