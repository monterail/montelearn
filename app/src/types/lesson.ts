export interface LessonList {
  count: number;
  next: string;
  previous: string;
  results: Lesson[];
}

export type Lesson = {
  description: string;
  grade: string;
  name: string;
  pdf_file?: string;
  subject: string;
  url: string;
  uuid: string;
};
