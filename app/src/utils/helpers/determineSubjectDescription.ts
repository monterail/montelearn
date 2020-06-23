import { subjectsContent } from "@/constants/content";

export const determineSubjectDescription = (subjectName: string) => {
  const foundSubject = subjectsContent.find(
    (subject) => subject.name.toLowerCase() === subjectName.toLowerCase(),
  );
  return foundSubject?.description || "This subject doesn't have additional description.";
};
