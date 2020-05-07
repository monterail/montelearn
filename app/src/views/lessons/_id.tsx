import Head from "next/head";
import { useRouter } from "next/router";
import { ButtonWithArrow } from "@/components/ButtonWithArrow";

function LessonPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <section className="px-2 mb-12">
      <Head>
        <title>Monterail e-learning app - Lesson {id}</title>
      </Head>
      <div className="flex items-center justify-between w-full">
        <div className="my-8">
          <small className="text-xl font-bold text-red-300">Lesson {id}</small>
          <h1 className="text-title font-semibold font-eczar break-words">What are pictograms?</h1>
        </div>
        <button
          type="button"
          className="
            flex py-2 px-6 border-2 font-medium text-white
            text-2xl bg-red-monterail rounded-full font-roboto-mono
          "
          onClick={() => window.alert("onklik lesson")}
        >
          Open lesson
        </button>
      </div>
      <h2 className="text-xl font-roboto-mono mb-8 max-w-screen-sm">
        The Hazard Communication Standard (HCS) requires pictograms on labels to alert users of the
        chemical hazards to which they may be exposed. In this lesson, you will learn more about
        chemistry pictograms.
      </h2>
      <hr className="my-10 block border border-gray-200 h-0 opacity-50" />
      <div className="flex flex-col items-center content-center">
        <div className="p-10 shadow-custom rounded-lg w-1/2 mb-8">
          <strong className="text-red-300 text-sm">Section 1</strong>
          <h2 className="text-4xl my-1 font-semibold">Intro</h2>
          <ButtonWithArrow direction="right" className="mt-8">
            Let's do it together!
          </ButtonWithArrow>
        </div>
        <div className="p-10 shadow-custom rounded-lg w-1/2 mb-8">
          <strong className="text-red-300 text-sm">Section 2</strong>
          <h2 className="text-4xl my-1 font-semibold">Exploding bomb</h2>
          <ButtonWithArrow direction="right" className="mt-8">
            Let's do it together!
          </ButtonWithArrow>
        </div>
        <div className="p-10 shadow-custom rounded-lg w-1/2 mb-8">
          <strong className="text-red-300 text-sm">Section 3</strong>
          <h2 className="text-4xl my-1 font-semibold">Environment</h2>
          <ButtonWithArrow direction="right" className="mt-8">
            Let's do it together!
          </ButtonWithArrow>
        </div>
      </div>
      <div className="flex flex-col items-center w-full bg-red-100 py-20 mt-10">
        <h2 className="font-eczar text-4xl font-semibold mb-8">Time to yest your konewledge</h2>
        <div className="p-10 bg-white rounded-lg w-1/2 mb-8">
          <strong className="text-red-300 text-sm">Question 1</strong>
          <h2 className="text-2xl my-1 font-semibold">
            Important information on the identity and hazards of a chemical material can be found on
            the container label:{" "}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default LessonPage;
