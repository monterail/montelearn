export const questionChoice = {
  answer: "answer",
};

export const question = {
  uuid: "question-uuid",
  question_type: "question_type",
  content: "content",
  choices: [questionChoice],
};

export const test = {
  uuid: "test-uuid",
  lesson_uuid: "lesson-uuid",
  questions: [question],
};

export const testList = {
  count: 1,
  next: "",
  previous: "",
  results: [test],
};
