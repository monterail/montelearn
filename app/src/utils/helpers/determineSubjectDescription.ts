import { subjectsContent } from "@/constants/content";

export const determineSubjectDescription = (subjectName: string) => {
  return (
    subjectsContent.find((subject) => subject.name === subjectName) ||
    "This subject doesn't have additional description."
  );
};
