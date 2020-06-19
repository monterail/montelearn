import { useState, useReducer } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Breadcrumbs from "@/components/Breadcrumbs";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Label from "@/components/Label";
import Button from "@/components/Button";
import RadioGroup from "@/components/RadioGroup";
import QuesitonLabel from "@/components/QuestionLabel";

import auth from "@/containers/hoc/Auth";

import { saveAnswers } from "@/services/tests";

import { Lesson } from "@/types/lesson";
import {
  Test,
  TestList,
  Question,
  QuestionAnswer,
  QuestionChoice,
  QuestionScoreResult,
} from "@/types/test";

import useRequest from "@/utils/hooks/useRequest";

export type Reducer = {
  type: "add" | "remove";
  answer: QuestionAnswer;
};

function LessonPage() {
  const router = useRouter();
  const { id, slug } = router.query;

  const [results, setResults] = useState([] as QuestionScoreResult[]);
  const [score, setScore] = useState("");
  const [error, setError] = useState("");
  const [answers, setAnswers] = useReducer((answersArray: QuestionAnswer[], action: Reducer) => {
    switch (action.type) {
      case "add":
        return [...answersArray, action.answer];
      case "remove":
        return answersArray.filter(
          (answer) => answer.question_uuid !== action.answer.question_uuid,
        );
      default:
        return answersArray;
    }
  }, []);

  const areAnswersSubmitted = !!score;

  const { data: lesson } = useRequest<Lesson>({
    url: `/lesson/${id}`,
  });

  const { data: tests } = useRequest<TestList>({
    url: `/tests/?lesson_uuid=${id}`,
  });

  const handleBackClick = (): void => {
    router.push(`/subjects/${slug}`);
  };

  const getAnswer = (questionUuid: string): QuestionAnswer | undefined => {
    return answers.find((answer) => answer.question_uuid === questionUuid);
  };

  const getResult = (questionUuid: string): QuestionScoreResult | undefined => {
    return results.find((result) => result.question_uuid === questionUuid);
  };

  const isCorrect = (questionUuid: string) => (questionChoice: QuestionChoice): boolean => {
    const questionResult = results.find((result) => result.question_uuid === questionUuid);
    return !!questionResult?.correct_answers.includes(questionChoice.answer);
  };

  const isSelected = (questionUuid: string) => (questionChoice: QuestionChoice): boolean => {
    const answer = getAnswer(questionUuid);
    return answer ? answer.selected_choices.includes(questionChoice.answer) : false;
  };

  const handleAnswerSubmit = (questionUuid: string) => (questionChoice: QuestionChoice): void => {
    const answer = getAnswer(questionUuid);

    if (answer) {
      setAnswers({ type: "remove", answer });
    }

    setAnswers({
      type: "add",
      answer: {
        question_uuid: questionUuid,
        selected_choices: [questionChoice.answer],
      },
    });
  };

  const handleSubmit = async (): Promise<void> => {
    const testId = tests?.results[0]?.uuid;

    if (!testId) return;

    try {
      const { data } = await saveAnswers(testId, answers);

      setScore(data.score);
      setResults(data.results);
      setError("");
    } catch (e) {
      if (e.response?.data?.detail?.answers) {
        setError("Please fill all test questions!");
      } else {
        setError("An unexpected error has occurred");
      }
    }
  };

  const renderQuestions = (questions: Question[]) =>
    questions.map((question, index) => {
      return (
        <div
          className="p-6 sm:p-10 bg-white rounded-lg w-full max-w-screen-md mb-8"
          key={question.uuid}
        >
          <Label className="text-sm">Question {index + 1}</Label>
          <Text className="my-1 md:text-xl xl:text-2xl font-semibold">{question.content}</Text>
          <div className="mt-6 flex flex-wrap w-full items-center justify-around">
            <div className="flex flex-col sm:flex-row mb-4 md:mb-0">
              <RadioGroup<QuestionChoice>
                className="mx-3 mb-4 sm:mb-0"
                isLocked={areAnswersSubmitted}
                isCorrect={isCorrect(question.uuid)}
                isSelected={isSelected(question.uuid)}
                onClick={handleAnswerSubmit(question.uuid)}
                optionKey="answer"
                options={question.choices}
              />
            </div>
            {areAnswersSubmitted && (
              <QuesitonLabel
                className="lg:mt-3 xl:mt-0"
                isCorrect={getResult(question.uuid)?.answered_correctly || false}
              />
            )}
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
          {tests?.results.map((test: Test) => (
            <div key={test.uuid}>{renderQuestions(test.questions)}</div>
          ))}
          {error && <div className="mb-6 text-red-300">{error}</div>}
          {tests?.results?.length ? (
            <div>
              {areAnswersSubmitted ? (
                <div className=" flex font-medium text-black bg-white rounded-full font-roboto-mono mr-auto mb-8 sm:mb-0 sm:mr-0 px-8 py-4 md:px-12 lg:py-3 lg:text-xl">
                  {score} right! Well done
                </div>
              ) : (
                <Button
                  className="mr-auto mb-8 sm:mb-0 sm:mr-0 px-8 py-4 md:px-12 lg:py-3 lg:text-xl"
                  onClick={handleSubmit}
                >
                  Test now
                </Button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default auth(LessonPage);
