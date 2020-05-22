export type QuestionChoice = {
  answer: string;
};

export type Question = {
  uuid: string;
  question_type: string;
  content: string;
  choices: QuestionChoice[];
};

export type Test = {
  uuid: string;
  lesson_uuid: string;
  questions: Question[];
};

export interface TestList {
  count: number;
  next: string;
  previous: string;
  results: Test[];
}
