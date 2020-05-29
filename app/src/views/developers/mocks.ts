const lesson = JSON.stringify([
  {
    uuid: "00981f5a-6685-4589-ad77-6a7e2a70ed9d",
    name: "Biology Lesson",
    description: "DNA",
    subject: "biology",
    grade: "eighth grade",
    pdf_file: null,
    url: "",
  },
  {
    uuid: "544de826-3f04-45e0-a44a-6f548c7e0aba",
    name: "Chemistry Lesson",
    description: "Organic acids",
    subject: "chemistry",
    grade: "first grade",
    pdf_file: null,
    url: "",
  },
  {
    uuid: "e71433ab-ff0d-4e3b-8aa6-5e9fb7b96469",
    name: "History",
    description: "II World War",
    subject: "biology",
    grade: "second grade",
    pdf_file: null,
    url: "",
  },
]);

const tests = JSON.stringify([
  {
    uuid: "2df29aaf-b1b0-4669-bff7-8c9510dc9adb",
    lesson_uuid: "cf48df3b-ae86-464e-acd7-6cdca498fa8a",
    questions: [
      {
        uuid: "afc686e6-6b0c-443b-92db-779f99575917",
        question_type: "binary",
        content: "Is math related to science?",
        choices: [
          {
            answer: "Yesn't",
          },
          {
            answer: "Non't",
          },
        ],
      },
    ],
  },
]);

const subject = JSON.stringify([
  {
    uuid: "18f473db-ec55-49b9-91da-02017fca55b8",
    name: "biology",
  },
  {
    uuid: "10740649-6c95-4351-b869-74010fd955de",
    name: "chemistry",
  },
]);

const grade = JSON.stringify([
  {
    uuid: "9b62eb64-0683-417c-a0e1-88ecbc5689c7",
    name: "first grade",
  },
  {
    uuid: "84758d21-7e8b-49f9-a690-65d624e43355",
    name: "second grade",
  },
  {
    uuid: "e19d8554-c082-461d-8822-0edb578fc8f9",
    name: "eighth grade",
  },
  {
    uuid: "d2b95dc0-48cf-4c79-b450-58ef74e7fc63",
    name: "kindergarden",
  },
]);

export function getMockedResponse(endpoint: string) {
  switch (endpoint) {
    case "lesson":
      return lesson;
    case "tests":
      return tests;
    case "subject":
      return subject;
    case "grade":
      return grade;
    default:
      return "";
  }
}
