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

export type QuestionAnswer = {
  question_uuid: string;
  selected_choices: string[];
};

export type QuestionScoreResult = {
  question_uuid: string;
  correct: boolean;
};

export type QuestionScore = {
  score: string;
  results: QuestionScoreResult[];
};
