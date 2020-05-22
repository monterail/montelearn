import Head from "next/head";
import { useRouter } from "next/router";

import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Label from "@/components/Label";
import Button from "@/components/Button";
import RadioButton from "@/components/RadioButton";
import QuesitonLabel from "@/components/QuestionLabel";

import auth from "@/containers/hoc/Auth";

import useRequest from "@/utils/hooks/useRequest";

import { Lesson } from "@/types/lesson";
import { TestList, Question } from "@/types/test";

function LessonPage() {
  const router = useRouter();
  const { id, slug } = router.query;

  const { data: lesson } = useRequest<Lesson>({
    url: `/lesson/${id}`,
  });

  const { data: tests } = useRequest<TestList>({
    url: `/tests/?lesson_uuid=${id}`,
  });

  const handleBackClick = () => {
    router.push(`/subjects/${slug}`);
  };

  const renderQuestions = (questions: Question[]) =>
    questions.map((question, index) => {
      return (
        <div className="p-6 sm:p-10 bg-white rounded-lg w-full mb-8" key={question.uuid}>
          <Label className="text-sm">Question {index + 1}</Label>
          <Text className="my-1 md:text-xl xl:text-2xl font-semibold">{question.content}</Text>
          <div className="mt-6 flex flex-wrap w-full items-center justify-around">
            <div className="flex flex-col sm:flex-row mb-4 md:mb-0">
              {question.choices.map((choice, i) => (
                <RadioButton key={i} className="mx-3 mb-4 sm:mb-0">
                  {choice.answer}
                </RadioButton>
              ))}
            </div>
            <QuesitonLabel className="lg:mt-3 xl:mt-0" isCorrect={false} />
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
        options={["Subjects", String(slug), `${String(lesson?.name)}`]}
      />
      <div className="mx-3 sm:mx-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
          <div className="my-8">
            <Label className="text-xl capitalize">{lesson?.grade}</Label>
            <Title className="mt-2 sm:mt-4">{lesson?.name}</Title>
          </div>
          <Button className="mr-auto mb-8 sm:mb-0 sm:mr-0 px-8 py-4 md:px-12 lg:py-6 lg:text-xl">
            <a href={lesson?.pdf_file} target="_blank" rel="noopener noreferrer">
              Open lesson
            </a>
          </Button>
        </div>
        <Text className="text-xl font-roboto-mono mb-8">{lesson?.description}</Text>
        <hr className="my-8 block border border-gray-200 h-0 opacity-50" />
        <div className="flex flex-col items-center w-full bg-red-100 py-20 mt-10">
          <h2 className="font-eczar text-center text-4xl font-semibold mb-8">
            Time to yest your knowledge
          </h2>
          {tests?.results.map((test) => (
            <div key={test.uuid}>{renderQuestions(test.questions)}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default auth(LessonPage);
